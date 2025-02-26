using TennisAPI.Data;
using TennisAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace TennisAPI.Controllers
{
    [Route("api/players")]
    [ApiController]
    public class PlayerController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PlayerController(ApplicationDbContext context)
        {
            _context = context;
        }

        // 1. Create a new player
        [HttpPost]
        public async Task<ActionResult<Player>> CreatePlayer([FromBody] Player player)
        {
            if (player == null)
            {
                return BadRequest("Player data is null.");
            }

            // Set the role as Player
            player.Role = "Player";

            _context.Users.Add(player);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPlayer", new { id = player.UserId }, player);
        }

        // 2. Get a list of all players
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Player>>> GetPlayers()
        {
            var players = await _context.Users
                .Where(u => u.Role == "Player")  // Filter players
                .ToListAsync();

            return Ok(players);
        }

        // 3. Get a specific player by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Player>> GetPlayer(int id)
        {
            var player = await _context.Users.FindAsync(id);

            if (player == null || player.Role != "Player")
            {
                return NotFound();
            }

            return Ok(player);
        }

        // 4. Delete a player
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlayer(int id)
        {
            var player = await _context.Users.FindAsync(id);

            if (player == null || player.Role != "Player")
            {
                return NotFound();
            }

            _context.Users.Remove(player);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // 5. Update (PUT) - Modify a player
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePlayer(int id, Player player)
        {
            if (id != player.UserId) return BadRequest();
            _context.Entry(player).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
