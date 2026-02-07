import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([])

  // Create note
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  // Edit modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedNote, setSelectedNote] = useState(null)
  const [editDescription, setEditDescription] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  // Toast
  const [toast, setToast] = useState({ show: false, message: '', type: '' })

  /* =========================
     FETCH NOTES
  ========================= */
  const fetchNotes = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/notes')
      setNotes(res.data.notes)
    } catch {
      showToast('Failed to fetch notes', 'error')
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  /* =========================
     ESC KEY CLOSE MODAL
  ========================= */
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsModalOpen(false)
    }

    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  /* =========================
     TOAST HELPER
  ========================= */
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type })
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000)
  }

  /* =========================
     CREATE NOTE
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:3000/api/notes', {
        title,
        description
      })
      setTitle('')
      setDescription('')
      fetchNotes()
      showToast('Note created')
    } catch {
      showToast('Create failed', 'error')
    }
  }

  /* =========================
     DELETE NOTE (CONFIRM)
  ========================= */
  const handleDeleteNote = async (id) => {
    const confirmed = window.confirm('Delete this note?')
    if (!confirmed) return

    try {
      await axios.delete(`http://localhost:3000/api/notes/${id}`)
      fetchNotes()
      showToast('Note deleted')
    } catch {
      showToast('Delete failed', 'error')
    }
  }

  /* =========================
     OPEN EDIT MODAL
  ========================= */
  const startEdit = (note) => {
    setSelectedNote(note)
    setEditDescription(note.description)
    setIsModalOpen(true)
  }

  /* =========================
     UPDATE NOTE
  ========================= */
  const updateNote = async () => {
    setIsSaving(true)
    try {
      await axios.patch(
        `http://localhost:3000/api/notes/${selectedNote._id}`,
        { description: editDescription }
      )

      fetchNotes()
      setIsModalOpen(false)
      showToast('Note updated')
    } catch {
      showToast('Update failed', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <>
      {/* CREATE FORM */}
      <form className="note-create-form" onSubmit={handleSubmit}>
        <input
          placeholder="Enter title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <input
          placeholder="Enter description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        <button>Create Note</button>
      </form>

      {/* NOTES */}
      <div className="notes">
        {notes.map(note => (
          <div className="note" key={note._id}>
            <h1>{note.title}</h1>
            <p>{note.description}</p>

            <div className="note-actions">
              <button className="update-btn" onClick={() => startEdit(note)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => handleDeleteNote(note._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>Edit Note</h2>

            <label>Title</label>
            <input value={selectedNote.title} disabled />

            <label>Description</label>
            <textarea
              value={editDescription}
              onChange={e => setEditDescription(e.target.value)}
            />

            <div className="modal-actions">
              <button className="update-btn" onClick={updateNote} disabled={isSaving}>
                {isSaving ? <span className="spinner" /> : 'Save'}
              </button>
              <button className="delete-btn" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast.show && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      )}
    </>
  )
}

export default App
