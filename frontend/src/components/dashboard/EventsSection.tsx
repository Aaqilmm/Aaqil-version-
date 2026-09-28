import { useCallback, useEffect, useState } from 'react'
import {
  CalendarDays,
  Edit3,
  ExternalLink,
  MapPin,
  Monitor,
  Plus,
  Trash2,
  X,
} from 'lucide-react'
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  EmptyState,
  Input,
} from '@/components/ui'

const API = '/api/v1'

export type EventMode = 'Online' | 'Offline'
export type EventSort = 'date-asc' | 'date-desc' | 'online-first' | 'offline-first'

export interface EventItem {
  id: number
  company_organization: string
  event_type: string
  description: string
  mode: string
  location: string | null
  event_date: string
  event_time: string
  application_url: string
  created_at: string
}

interface EventDraft {
  name: string
  organizer: string
  type: string
  description: string
  date: string
  time: string
  mode: EventMode
  location: string
  application_url: string
}

const EMPTY_DRAFT: EventDraft = {
  name: '',
  organizer: '',
  type: 'Hackathon',
  description: '',
  date: '',
  time: '',
  mode: 'Online',
  location: '',
  application_url: '',
}

const modeToApi = (m: EventMode) => (m === 'Online' ? 'online' : 'in-person')
const modeFromApi = (m: string): EventMode =>
  m.toLowerCase() === 'online' ? 'Online' : 'Offline'

const displayName = (ev: EventItem) => ev.company_organization
const displayOrganizer = (ev: EventItem) => {
  const desc = ev.description ?? ''
  const match = desc.match(/^Organized by (.+?)(?:\n|$)/)
  return match ? match[1] : ''
}
const displayDescription = (ev: EventItem) => {
  const desc = ev.description ?? ''
  return desc.replace(/^Organized by .+?\n?/, '').trim()
}

export const formatDate = (date: string) => {
  if (!date || !date.trim()) return 'Date TBD'
  const parsed = new Date(`${date}T00:00:00`)
  return isNaN(parsed.getTime())
    ? date
    : new Intl.DateTimeFormat('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(parsed)
}

function eventToDraft(ev: EventItem): EventDraft {
  return {
    name: displayName(ev),
    organizer: displayOrganizer(ev),
    type: ev.event_type,
    description: displayDescription(ev),
    date: ev.event_date,
    time: ev.event_time.slice(0, 5),
    mode: modeFromApi(ev.mode),
    location: ev.location ?? '',
    application_url: ev.application_url,
  }
}

function draftToPayload(d: EventDraft) {
  const descParts = [`Organized by ${d.organizer}`]
  if (d.description.trim()) descParts.push(d.description.trim())
  return {
    company_organization: d.name,
    event_type: d.type,
    description: descParts.join('\n'),
    mode: modeToApi(d.mode),
    location: d.mode === 'Online' ? null : d.location || null,
    event_date: d.date,
    event_time: d.time,
    application_url: d.application_url,
  }
}

export function EventsSection() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [creatingNew, setCreatingNew] = useState(false)
  const [draft, setDraft] = useState<EventDraft | null>(null)
  const [sortOrder, setSortOrder] = useState<EventSort>('date-asc')
  const [error, setError] = useState('')

  const fetchEvents = useCallback(async () => {
    try {
      const res = await fetch(`${API}/events`)
      if (!res.ok) throw new Error('Failed to load events')
      setEvents(await res.json())
      setError('')
    } catch {
      setError('Could not load events from server.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  const sortedEvents = [...events].sort((first, second) => {
    if (sortOrder === 'online-first' && first.mode !== second.mode) {
      return first.mode.toLowerCase() === 'online' ? -1 : 1
    }
    if (sortOrder === 'offline-first' && first.mode !== second.mode) {
      return first.mode.toLowerCase() !== 'online' ? -1 : 1
    }
    return sortOrder === 'date-desc'
      ? second.event_date.localeCompare(first.event_date)
      : first.event_date.localeCompare(second.event_date)
  })

  const startCreating = () => {
    setEditingId(null)
    setCreatingNew(true)
    setDraft({ ...EMPTY_DRAFT })
  }

  const startEditing = (event: EventItem) => {
    setCreatingNew(false)
    setEditingId(event.id)
    setDraft(eventToDraft(event))
  }

  const cancelEditing = () => {
    setEditingId(null)
    setCreatingNew(false)
    setDraft(null)
  }

  const saveEditing = async () => {
    if (!draft || !draft.name.trim() || !draft.organizer.trim() || !draft.application_url.trim()) return
    const payload = draftToPayload(draft)
    try {
      if (creatingNew) {
        const res = await fetch(`${API}/events`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) {
          const err = await res.json()
          throw new Error(err.detail ?? 'Failed to create event')
        }
      } else if (editingId) {
        const res = await fetch(`${API}/events/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) {
          const err = await res.json()
          throw new Error(err.detail ?? 'Failed to update event')
        }
      }
      cancelEditing()
      fetchEvents()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    }
  }

  const deleteEvent = async (id: number) => {
    if (!window.confirm('Delete this event?')) return
    try {
      await fetch(`${API}/events/${id}`, { method: 'DELETE' })
      if (editingId === id) cancelEditing()
      fetchEvents()
    } catch {
      setError('Failed to delete event')
    }
  }

  return (
    <div className="animate-fade-up space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Community / Events</p>
          <h1 className="section-h2">Events</h1>
          <div className="section-underline" aria-hidden="true" />
          <p className="section-body">
            Browse and manage open-source community events for contributors.
          </p>
        </div>
        <Button
          type="button"
          className="self-start sm:self-auto gap-2"
          onClick={startCreating}
        >
          <Plus className="size-4" aria-hidden="true" />
          Add Event
        </Button>
      </div>

      {error && (
        <div className="flex items-center gap-2.5 rounded-lg border border-red-300/30 bg-red-50/10 px-4 py-2.5 text-xs text-red-400">
          <span>{error}</span>
          <button onClick={() => setError('')} className="ml-auto text-red-400 hover:text-red-300">
            <X className="size-3.5" />
          </button>
        </div>
      )}

      {/* Main Events Card */}
      <Card className="rounded-xl">
        <CardHeader className="border-b border-border">
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle>EVENT LIST</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                {loading ? 'Loading...' : `${events.length} ${events.length === 1 ? 'event' : 'events'} currently published.`}
              </p>
            </div>
            <CalendarDays className="size-5 text-accent-text" aria-hidden="true" />
          </div>
        </CardHeader>

        <CardContent className="space-y-4 p-4 sm:p-5">
          {creatingNew && draft && (
            <div className="rounded-lg border border-border bg-background p-4 sm:p-5">
              <EventEditor
                draft={draft}
                onChange={setDraft}
                onCancel={cancelEditing}
                onSave={saveEditing}
                heading="ADD EVENT"
                submitLabel="Add Event"
              />
            </div>
          )}

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <label htmlFor="events-sort" className="font-mono text-xs text-muted-foreground">
              Sort events
            </label>
            <select
              id="events-sort"
              className="input-field h-9 text-xs sm:max-w-xs"
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value as EventSort)}
            >
              <option value="date-asc">Date: earliest first</option>
              <option value="date-desc">Date: latest first</option>
              <option value="online-first">Online first</option>
              <option value="offline-first">Offline first</option>
            </select>
          </div>

          {!loading && events.length === 0 ? (
            <EmptyState
              icon={CalendarDays}
              title="No events available"
              description="Published community events will appear here once scheduled."
              action={
                <Button size="sm" onClick={startCreating} className="gap-1.5">
                  <Plus className="size-4" /> Add your first event
                </Button>
              }
            />
          ) : (
            sortedEvents.map((event) => (
              <div
                key={event.id}
                className="rounded-lg border border-border bg-background p-4 sm:p-5 transition-all hover:border-accent/40"
              >
                {editingId === event.id && draft ? (
                  <EventEditor
                    draft={draft}
                    onChange={setDraft}
                    onCancel={cancelEditing}
                    onSave={saveEditing}
                    heading="EDIT EVENT"
                    submitLabel="Save changes"
                  />
                ) : (
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="min-w-0 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-base font-semibold">{displayName(event)}</h2>
                        <Badge variant="secondary" className="text-[10px]">
                          {event.event_type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Organized by {displayOrganizer(event) || displayName(event)}
                      </p>
                      {displayDescription(event) && (
                        <p className="text-xs text-muted-foreground/80">
                          {displayDescription(event)}
                        </p>
                      )}
                      <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays className="size-3.5" aria-hidden="true" />
                          {formatDate(event.event_date)} at {event.event_time.slice(0, 5)} IST
                        </span>
                        <span className="flex items-center gap-1.5">
                          {event.mode.toLowerCase() === 'online' ? (
                            <Monitor className="size-3.5 text-accent" aria-hidden="true" />
                          ) : (
                            <MapPin className="size-3.5 text-accent" aria-hidden="true" />
                          )}
                          {event.mode.toLowerCase() === 'online' ? 'Online' : event.location ?? 'In-person'}
                        </span>
                        {event.application_url && (
                          <a
                            href={event.application_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-accent hover:underline"
                          >
                            <ExternalLink className="size-3" aria-hidden="true" />
                            Apply
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => startEditing(event)}
                        aria-label={`Edit ${displayName(event)}`}
                        className="gap-1.5"
                      >
                        <Edit3 className="size-3.5" aria-hidden="true" />
                        Edit
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => deleteEvent(event.id)}
                        aria-label={`Delete ${displayName(event)}`}
                        className="gap-1.5 text-muted-foreground hover:border-accent/70 hover:text-accent-text"
                      >
                        <Trash2 className="size-3.5" aria-hidden="true" />
                        Delete
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function EventEditor({
  draft,
  onChange,
  onCancel,
  onSave,
  heading,
  submitLabel,
}: {
  draft: EventDraft
  onChange: (event: EventDraft) => void
  onCancel: () => void
  onSave: () => void
  heading: string
  submitLabel: string
}) {
  const update = (field: keyof EventDraft, value: string) =>
    onChange({ ...draft, [field]: value })

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSave()
      }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between gap-3 border-b border-border pb-3">
        <h2 className="font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          {heading}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-surface hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Cancel editing"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-mono font-medium text-muted-foreground">
            Event name
          </label>
          <Input
            value={draft.name}
            onChange={(event) => update('name', event.target.value)}
            placeholder="e.g. Open Source Sprint 2026"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono font-medium text-muted-foreground">
            Organization
          </label>
          <Input
            value={draft.organizer}
            onChange={(event) => update('organizer', event.target.value)}
            placeholder="e.g. FOSS United"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono font-medium text-muted-foreground">
            Event type
          </label>
          <select
            className="input-field h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground transition-all duration-200 focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            value={draft.type}
            onChange={(event) => update('type', event.target.value)}
          >
            {[
              'Hackathon',
              'Workshop',
              'Meetup',
              'Conference',
              'Webinar',
              'Coding Contest',
              'Open Source Program',
              'Other',
            ].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-mono font-medium text-muted-foreground">
            Description
          </label>
          <textarea
            className="input-field w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground transition-all duration-200 focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            rows={2}
            value={draft.description}
            onChange={(event) => update('description', event.target.value)}
            placeholder="Brief description of the event"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono font-medium text-muted-foreground">
            Date
          </label>
          <Input
            type="date"
            value={draft.date}
            onChange={(event) => update('date', event.target.value)}
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono font-medium text-muted-foreground">
            Time (IST)
          </label>
          <Input
            type="time"
            value={draft.time}
            onChange={(event) => update('time', event.target.value)}
            required
          />
        </div>

        <fieldset className="space-y-2 md:col-span-2">
          <legend className="text-xs font-mono font-medium text-muted-foreground">
            Event mode
          </legend>
          <div className="flex gap-2">
            {(['Online', 'Offline'] as EventMode[]).map((mode) => (
              <Button
                key={mode}
                type="button"
                variant={draft.mode === mode ? 'default' : 'secondary'}
                size="sm"
                onClick={() =>
                  onChange({
                    ...draft,
                    mode,
                    location: mode === 'Online' ? '' : draft.location,
                  })
                }
                className="gap-1.5 px-4"
              >
                {mode === 'Online' ? (
                  <Monitor className="size-3.5" />
                ) : (
                  <MapPin className="size-3.5" />
                )}
                {mode}
              </Button>
            ))}
          </div>
        </fieldset>

        {draft.mode === 'Offline' && (
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-mono font-medium text-muted-foreground">
              Location
            </label>
            <Input
              value={draft.location}
              onChange={(event) => update('location', event.target.value)}
              placeholder="e.g. Bengaluru Tech Hub"
              required
            />
          </div>
        )}

        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-mono font-medium text-muted-foreground">
            Application / Registration URL
          </label>
          <Input
            type="url"
            value={draft.application_url}
            onChange={(event) => update('application_url', event.target.value)}
            placeholder="https://example.com/register"
            required
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 border-t border-border pt-4">
        <Button type="button" variant="secondary" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" size="sm">
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}

export default EventsSection
