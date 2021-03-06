// Definition of the data that should be returned from a successful authentication;

namespace WebApi.Models.Accounts;

public class AccountResponse
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string LocationNames { get; set; }
    public int numberOfLocations { get; set; } 
    public string Email { get; set; }
    public string Role { get; set; }
    public DateTime Created { get; set; }
    public DateTime? Updated {get; set; }
    public bool IsVerified { get; set; }
}



