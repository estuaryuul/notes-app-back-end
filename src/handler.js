/* eslint-disable linebreak-style */
const { nanoid } = require('nanoid');
const notes = require('./notes');

/* eslint-disable linebreak-style */
const addNoteHandler  = (request, h) => {
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const createAt = new Date().toISOString();
  const updateAt = createAt;

  const newNotes = {
    title,
    tags,
    body,
    id,
    createAt,
    updateAt
  };

  notes.push(newNotes);

  const isSuccsess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccsess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });

  response.code(404);
  return response;
};

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const { title, tags, body } = request.payload;

  const updateAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updateAt,
    };
  };

  const response = h.response({
    status: 'success',
    message: 'Catatan berhasil diperbarui',
  });

  response.code(200);
  return response;
};

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);

    return response;
  };
};


module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler
};