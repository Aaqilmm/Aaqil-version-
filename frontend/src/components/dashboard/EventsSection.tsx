import { useState } from 'react'
import { CalendarDays, Edit3, MapPin, Monitor, Plus, Trash2, X } from 'lucide-react'
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui'

type EventMode = 'Online' | 'Offline'
type EventSort = 'date-asc' | 'date-desc' | 'online-first' | 'offline-first'

interface EventItem {
  id: number
  name: string
  type: string
  date: string
  time: string
  mode: EventMode
  location: string
  organizer: string
}

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

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`))

export default function EventsSection() {
  const [events, setEvents] = useState(initialEvents)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [creatingNew, setCreatingNew] = useState(false)
  const [draft, setDraft] = useState<EventItem | null>(null)
  const [sortOrder, setSortOrder] = useState<EventSort>('date-asc')

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
    setDraft({ id: 0, name: '', type: 'Hackathon', date: '', time: '', mode: 'Online', location: '', organizer: '' })
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
      setEvents((current) => current.map((event) => (event.id === draft.id ? draft : event)))
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Admin / Events</p>
          <h1 className="section-h2">Events</h1>
          <div className="section-underline" aria-hidden="true" />
          <p className="section-body">Review and manage the open-source events published for contributors.</p>
        </div>
        <Button type="button" className="self-start sm:self-auto" onClick={startCreating}>
          <Plus aria-hidden="true" />
          Add Event
        </Button>
      </div>

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

        <CardContent className="space-y-3 p-4 sm:p-5">
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
            <label htmlFor="events-sort" className="text-sm font-medium">Sort events</label>
            <select
              id="events-sort"
              className="input-field sm:max-w-xs"
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
            <div className="rounded-lg border border-dashed border-border px-6 py-12 text-center">
              <CalendarDays className="mx-auto size-8 text-muted-foreground" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold">No events available</p>
              <p className="mt-1 text-sm text-muted-foreground">Published events will appear here.</p>
            </div>
          ) : (
            sortedEvents.map((event) => (
              <div key={event.id} className="rounded-lg border border-border bg-background p-4 sm:p-5">
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
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-base font-semibold">{event.name}</h2>
                        <span className="chip-neutral">{event.type}</span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">Organized by {event.organizer}</p>
                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays className="size-3.5" aria-hidden="true" />
                          {formatDate(event.date)} at {event.time} IST
                        </span>
                        <span className="flex items-center gap-1.5">
                          {event.mode === 'Online' ? (
                            <Monitor className="size-3.5" aria-hidden="true" />
                          ) : (
                            <MapPin className="size-3.5" aria-hidden="true" />
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
                      >
                        <Edit3 aria-hidden="true" />
                        Edit
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => deleteEvent(event.id)}
                        aria-label={`Delete ${event.name}`}
                        className="text-muted-foreground hover:border-accent/70 hover:text-accent-text"
                      >
                        <Trash2 aria-hidden="true" />
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
  const update = (field: keyof EventItem, value: string) => onChange({ ...draft, [field]: value })

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSave()
      }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-mono text-sm font-semibold">{heading}</h2>
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
        <label className="space-y-1.5 text-sm font-medium md:col-span-2">
          Event name
          <input className="input-field" value={draft.name} onChange={(event) => update('name', event.target.value)} required />
        </label>
        <label className="space-y-1.5 text-sm font-medium">
          Organization
          <input className="input-field" value={draft.organizer} onChange={(event) => update('organizer', event.target.value)} required />
        </label>
        <label className="space-y-1.5 text-sm font-medium">
          Event type
          <select className="input-field" value={draft.type} onChange={(event) => update('type', event.target.value)}>
            {['Hackathon', 'Workshop', 'Meetup', 'Conference', 'Webinar', 'Coding Contest', 'Open Source Program', 'Other'].map(
              (type) => <option key={type}>{type}</option>,
            )}
          </select>
        </label>
        <label className="space-y-1.5 text-sm font-medium">
          Date
          <input className="input-field" type="date" value={draft.date} onChange={(event) => update('date', event.target.value)} required />
        </label>
        <label className="space-y-1.5 text-sm font-medium">
          Time (IST)
          <input className="input-field" type="time" value={draft.time} onChange={(event) => update('time', event.target.value)} required />
        </label>
        <fieldset className="space-y-2 md:col-span-2">
          <legend className="text-sm font-medium">Event mode</legend>
          <div className="flex gap-2">
            {(['Online', 'Offline'] as EventMode[]).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => onChange({ ...draft, mode, location: mode === 'Online' ? '' : draft.location })}
                className={`rounded-md border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  draft.mode === mode
                    ? 'border-accent bg-accent/15 text-accent-text'
                    : 'border-border text-muted-foreground hover:border-accent/60 hover:text-foreground'
                }`}
                aria-pressed={draft.mode === mode}
              >
                {mode}
              </button>
            ))}
          </div>
        </fieldset>
        {draft.mode === 'Offline' && (
          <label className="space-y-1.5 text-sm font-medium md:col-span-2">
            Location
            <input className="input-field" value={draft.location} onChange={(event) => update('location', event.target.value)} required />
          </label>
        )}
      </div>
      <div className="flex justify-end gap-2 border-t border-border pt-4">
        <Button type="button" variant="secondary" size="sm" onClick={onCancel}>Cancel</Button>
        <Button type="submit" size="sm">{submitLabel}</Button>
      </div>
    </form>
  )
}