// Contains properties defined in appsettings.json file, used for
// accessing application settings via objects that are injected using
// .NET's built in dependency injection system.

namespace WebApi.Helpers;

public class AppSettings
{
    public string Secret { get; set; }

    public int RefreshTokenTTL { get; set; }
    public string EmailFrom { get; set; }
    public string SmtpHost { get; set; }
    public string SmtpPort { get; set; }
    public string SmtpUser { get; set; }
    public string SmtpPass { get; set;}

}