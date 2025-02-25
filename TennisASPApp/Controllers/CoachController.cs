using TennisAPI.Data;
using TennisAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace TennisAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoachController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CoachController(ApplicationDbContext context)
        {
            _context = context;
        }

        // 1. Create a new coach
        [HttpPost]
        public async Task<ActionResult<Player>> CreateCoach([FromBody] Player player)
        {
            try
            {
                if (player == null)
                {
                    return BadRequest("Coach data is null.");
                }

                _context.Users.Add(player);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                // Log the exception
                return BadRequest($"Error: {ex.Message}");
            }
            
            try
            {
                var tst = CreatedAtAction("GetCoachesById", new { id = player.UserId }, player);
                return tst;
            }
            catch (Exception ex)
            {
                // Log the exception
                return BadRequest($"Error: {ex.Message}");
            }
            return null;
        }

        // 2. Get a list of all coaches
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Player>>> GetCoaches()
        {
            var players = await _context.Users
                .Where(u => u.Role == "Coach")  // Filter coaches
                .ToListAsync();

            return Ok(players);
        }

        // 3. Get a specific coach by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Player>> GetCoachesById(int id)
        {
            var player = await _context.Users.FindAsync(id);

            if (player == null || player.Role != "Coach")
            {
                return NotFound();
            }

            return Ok(player);
        }

        // 4. Delete a coach
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlayer(int id)
        {
            var player = await _context.Users.FindAsync(id);

            if (player == null || player.Role != "Coach")
            {
                return NotFound();
            }

            _context.Users.Remove(player);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // 5. Update (PUT) - Modify a coach
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCoach(int id, Player player)
        {
            if (id != player.UserId) return BadRequest();
            _context.Entry(player).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
