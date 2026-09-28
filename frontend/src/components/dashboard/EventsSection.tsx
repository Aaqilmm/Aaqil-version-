import { useEffect, useState } from 'react'
import {
  CalendarDays,
  Edit3,
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

export type EventMode = 'Online' | 'Offline'
export type EventSort = 'date-asc' | 'date-desc' | 'online-first' | 'offline-first'

export interface EventItem {
  id: number
  name: string
  type: string
  date: string
  time: string
  mode: EventMode
  location: string
  organizer: string
}

const STORAGE_KEY = 'osa_dashboard_events'

const initialEvents: EventItem[] = [
  {
    id: 1,
    name: 'Open Source Sprint 2026',
    type: 'Hackathon',
    date: '2026-10-12',
    time: '10:00',
    mode: 'Online',
    location: '',
    organizer: 'Open Source India',
  },
  {
    id: 2,
    name: 'Community Maintainers Meetup',
    type: 'Meetup',
    date: '2026-11-04',
    time: '18:30',
    mode: 'Offline',
    location: 'Bengaluru Tech Hub',
    organizer: 'FOSS United',
  },
  {
    id: 3,
    name: 'Contributing to Your First Project',
    type: 'Workshop',
    date: '2026-11-18',
    time: '15:00',
    mode: 'Online',
    location: '',
    organizer: 'Code for Everyone',
  },
]

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

const readStoredEvents = (): EventItem[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? (JSON.parse(saved) as EventItem[]) : initialEvents
  } catch {
    return initialEvents
  }
}

const saveStoredEvents = (events: EventItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events))
  } catch {
    /* storage may be unavailable */
  }
}

export function EventsSection() {
  const [events, setEvents] = useState<EventItem[]>(readStoredEvents)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [creatingNew, setCreatingNew] = useState(false)
  const [draft, setDraft] = useState<EventItem | null>(null)
  const [sortOrder, setSortOrder] = useState<EventSort>('date-asc')

  useEffect(() => {
    saveStoredEvents(events)
  }, [events])

  const sortedEvents = [...events].sort((first, second) => {
    if (sortOrder === 'online-first' && first.mode !== second.mode) {
      return first.mode === 'Online' ? -1 : 1
    }
    if (sortOrder === 'offline-first' && first.mode !== second.mode) {
      return first.mode === 'Offline' ? -1 : 1
    }
    return sortOrder === 'date-desc'
      ? second.date.localeCompare(first.date)
      : first.date.localeCompare(second.date)
  })

  const startCreating = () => {
    setEditingId(null)
    setCreatingNew(true)
    setDraft({
      id: 0,
      name: '',
      type: 'Hackathon',
      date: '',
      time: '',
      mode: 'Online',
      location: '',
      organizer: '',
    })
  }

  const startEditing = (event: EventItem) => {
    setCreatingNew(false)
    setEditingId(event.id)
    setDraft({ ...event })
  }

  const cancelEditing = () => {
    setEditingId(null)
    setCreatingNew(false)
    setDraft(null)
  }

  const saveEditing = () => {
    if (!draft || !draft.name.trim() || !draft.organizer.trim()) return
    if (creatingNew) {
      setEvents((current) => {
        const id = Math.max(0, ...current.map((event) => event.id)) + 1
        return [...current, { ...draft, id }]
      })
    } else {
      setEvents((current) =>
        current.map((event) => (event.id === draft.id ? draft : event)),
      )
    }
    cancelEditing()
  }

  const deleteEvent = (id: number) => {
    if (!window.confirm('Delete this event?')) return
    setEvents((current) => current.filter((event) => event.id !== id))
    if (editingId === id) cancelEditing()
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
            Review and discover open-source community events published for contributors.
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

      {/* Placeholder / Demo Notice */}
      <div className="flex items-center gap-2.5 rounded-lg border border-accent/20 bg-accent/5 px-4 py-2.5 text-xs text-muted-foreground">
        <Badge variant="accent" className="shrink-0 text-[10px]">
          Preview Mode
        </Badge>
        <span className="flex-1">
          Demo events are stored in local browser state. Real-time community events backend API integration is coming soon.
        </span>
      </div>

      {/* Main Events Card */}
      <Card className="rounded-xl">
        <CardHeader className="border-b border-border">
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle>EVENT LIST</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                {events.length} {events.length === 1 ? 'event' : 'events'} currently published.
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

          {events.length === 0 ? (
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
                        <h2 className="text-base font-semibold">{event.name}</h2>
                        <Badge variant="secondary" className="text-[10px]">
                          {event.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Organized by {event.organizer}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays className="size-3.5" aria-hidden="true" />
                          {formatDate(event.date)} at {event.time} IST
                        </span>
                        <span className="flex items-center gap-1.5">
                          {event.mode === 'Online' ? (
                            <Monitor className="size-3.5 text-accent" aria-hidden="true" />
                          ) : (
                            <MapPin className="size-3.5 text-accent" aria-hidden="true" />
                          )}
                          {event.mode === 'Online' ? 'Online' : event.location}
                        </span>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => startEditing(event)}
                        aria-label={`Edit ${event.name}`}
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
                        aria-label={`Delete ${event.name}`}
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
  draft: EventItem
  onChange: (event: EventItem) => void
  onCancel: () => void
  onSave: () => void
  heading: string
  submitLabel: string
}) {
  const update = (field: keyof EventItem, value: string) =>
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
