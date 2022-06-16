// Used to allow public access to specific action methods when a controller class is
// Decorated with the Authorize Attribute
// Creating a custom AllowAnonymous attribute is done for consistency with
// the other auth classes

namespace WebApi.Authorization;

[AttributeUsage(AttributeTargets.Method)]
public class AllowAnonymousAttribute : Attribute
{}