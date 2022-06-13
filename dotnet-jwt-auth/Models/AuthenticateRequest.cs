// Model containing the parameters for incoming requests from the route
// "users/authenticate". It is attached to the route as the parameter
// to the Authenticate action method of the users controller

namespace WebApi.Models;

using System.ComponentModel.DataAnnotations;

public class AuthenticateRequest {
    [Required]
    public string Username { get; set; }

    [Required]
    public string Password { get; set; }
}