// Defines parameters for incoming POST requests to the /accounts/verify-email route
namespace WebApi.Models.Accounts;

using System.ComponentModel.DataAnnotations;

public class VerifyEmailRequest
{
    [Required]
    public string Token { get; set; }
}