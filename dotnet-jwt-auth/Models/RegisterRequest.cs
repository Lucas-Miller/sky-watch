// Defines parameters for POST requests to the accounts/register route

namespace WebApi.Models.Accounts;

using System.ComponentModel.DataAnnotations;

public class RegisterRequest
{

    [Required]
    public string FirstName { get; set; }

    [Required]
    public string LastName { get; set; }
    public string LocationNames { get; set; }
    public int numberOfLocations { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [MinLength(6)]
    public string Password { get; set; }

    [Required]
    [Compare("Password")]
    public string ConfirmPassword { get; set; }

    [Range(typeof(bool), "true", "true")]
    public bool AcceptTerms { get; set; }
}