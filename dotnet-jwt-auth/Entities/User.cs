/*
    This class represents the data of a user in the application.
    We use an entity class for this because they are used to pass
    data between different parts of an application, in our case it
    will be used to return HTTP response data from the controller
    action methods. 
*/

namespace WebApi.Entities;

using System.Text.Json.Serialization;

public class User
{
    public int Id {get; set;}
    public string FirstName {get; set;}
    public string LastName {get; set;}
    public string Username {get; set;}

    [JsonIgnore]                       // The Json ignore attribute prevents a password from being 
    public string Password {get; set;} // serialized/returned in API responses.

    
}