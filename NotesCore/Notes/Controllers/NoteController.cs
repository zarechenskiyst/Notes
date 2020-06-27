using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Notes.Models;

namespace Notes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoteController : ControllerBase
    {
        private readonly NotesDBContext _context;

        public NoteController(NotesDBContext context)
        {
            _context = context;
        }

        // GET: api/Note
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DNote>>> GetDNotes()
        {
            return await _context.DNotes.ToListAsync();
        }

        // GET: api/Note/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DNote>> GetDNote(int id)
        {
            var dNote = await _context.DNotes.FindAsync(id);

            if (dNote == null)
            {
                return NotFound();
            }

            return dNote;
        }

        // PUT: api/Note/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDNote(int id, DNote dNote)
        {
            dNote.Id = id;

            _context.Entry(dNote).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DNoteExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Note
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<DNote>> PostDNote(DNote dNote)
        {
            _context.DNotes.Add(dNote);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDNote", new { id = dNote.Id }, dNote);
        }

        // DELETE: api/Note/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DNote>> DeleteDNote(int id)
        {
            var dNote = await _context.DNotes.FindAsync(id);
            if (dNote == null)
            {
                return NotFound();
            }

            _context.DNotes.Remove(dNote);
            await _context.SaveChangesAsync();

            return dNote;
        }

        private bool DNoteExists(int id)
        {
            return _context.DNotes.Any(e => e.Id == id);
        }
    }
}
