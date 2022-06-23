// Defines parameters for incoming POST requests to /accounts/revoke-token route
namespace WebApi.Models.Accounts;

public class RevokeTokenRequest
{
    public string Token { get; set; }
}