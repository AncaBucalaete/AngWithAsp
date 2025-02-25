using System.ComponentModel.DataAnnotations;

namespace TennisAPI.Models
{
    public class Player
    {
        [Key]
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string? PasswordHash { get; set; }
        public string Role { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? DateOfBirth { get; set; } // Nullable for optional field
        public string? Level { get; set; } // e.g., Beginner, Intermediate, Advanced
        public string? ProfileImage { get; set; } // URL or path to image
    }
}
