using backend.Models;

namespace backend.Initializer
{
    public class DbInitializer
    {
        public static void Initialize(AppDbContext context)
        {
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();

            // dummy data
            if (!context.Users.Any())
            {
                var users = new User[]
                {
                    new() { FirstName="Jarne", LastName="Dirken", Email="jarnedirken@gmail.com", FirebaseUid="JXmmMcfM3bQ2upUcJ334f2VD9Uz2" },
                    new() { FirstName="Jeffry", LastName="Timson", Email="test@gmail.com", FirebaseUid="0KHGbd3hGIgjRJp9G1scmPrgtjK2" }
                };

                context.Users.AddRange(users);
                context.SaveChanges();
            }

            if (!context.Trips.Any())
            {
                var user2 = context.Users.FirstOrDefault(u => u.Id == 2);

                var trips = new Trip[]
                {
                    // Trips for User 1
                    new() { Name="Vacances d'été à Split", Location="Split, Croatie",
                        StartDate=DateTime.SpecifyKind(new DateTime(2023, 7, 10), DateTimeKind.Utc),
                        EndDate=DateTime.SpecifyKind(new DateTime(2023, 7, 17), DateTimeKind.Utc),
                        UserId=1, Budget=2500, UsersInvited = user2 != null ? new List<string> { user2.FirebaseUid } : new List<string>() },

                    new() { Name="Week-end à Amsterdam", Location="Amsterdam, Pays-Bas",
                        StartDate=DateTime.SpecifyKind(new DateTime(2024, 4, 5), DateTimeKind.Utc),
                        EndDate=DateTime.SpecifyKind(new DateTime(2024, 4, 7), DateTimeKind.Utc),
                        UserId=1, Budget=800 },

                    new() { Name="Aventure au Japon", Location="Tokyo, Japon",
                        StartDate=DateTime.SpecifyKind(new DateTime(2025, 9, 15), DateTimeKind.Utc),
                        EndDate=DateTime.SpecifyKind(new DateTime(2025, 10, 1), DateTimeKind.Utc),
                        UserId=1, Budget=5000, IsPublic=true },

                    // Trips for User 2
                    new() { Name="Escapade romantique à Paris", Location="Paris, France",
                        StartDate=DateTime.SpecifyKind(new DateTime(2024, 2, 14), DateTimeKind.Utc),
                        EndDate=DateTime.SpecifyKind(new DateTime(2024, 2, 18), DateTimeKind.Utc),
                        UserId=2, Budget=1500 },

                    new() { Name="Road trip en Californie", Location="Los Angeles, États-Unis",
                        StartDate=DateTime.SpecifyKind(new DateTime(2023, 9, 1), DateTimeKind.Utc),
                        EndDate=DateTime.SpecifyKind(new DateTime(2023, 9, 15), DateTimeKind.Utc),
                        UserId=2, Budget=4000, IsPublic=true }
                };

                context.Trips.AddRange(trips);
                context.SaveChanges();
            }

            if (!context.Activities.Any())
            {
                var activities = new Activity[]
                {
                    // Activities for User 1 - Trip 1 (Vacances d'été à Split)
                    new() { Name="Visite de la vieille ville de Split", TripId=1, Location="Split, Croatie",
                        StartDate=DateTime.SpecifyKind(new DateTime(2023, 7, 11, 10, 0, 0), DateTimeKind.Utc),
                        EndDate=DateTime.SpecifyKind(new DateTime(2023, 7, 11, 14, 0, 0), DateTimeKind.Utc),
                        Description="Promenade dans les rues historiques et découverte de l'architecture romaine", Cost=50 },
                    new() { Name="Excursion en bateau autour des îles", TripId=1, Location="Split, Croatie",
                        StartDate=DateTime.SpecifyKind(new DateTime(2023, 7, 12, 9, 0, 0), DateTimeKind.Utc),
                        EndDate=DateTime.SpecifyKind(new DateTime(2023, 7, 12, 16, 0, 0), DateTimeKind.Utc),
                        Description="Bateau privé pour explorer les îles proches de Split", Cost=150 },
                    new() { Name="Dîner romantique sur la plage", TripId=1, Location="Split, Croatie",
                        StartDate=DateTime.SpecifyKind(new DateTime(2023, 7, 13, 19, 0, 0), DateTimeKind.Utc),
                        EndDate=DateTime.SpecifyKind(new DateTime(2023, 7, 13, 22, 0, 0), DateTimeKind.Utc),
                        Description="Dîner aux chandelles avec vue sur la mer", Cost=100 },
                    new() { Name="Randonnée dans le parc national de Krka", TripId=1, Location="Krka, Croatie",
                        StartDate=DateTime.SpecifyKind(new DateTime(2023, 7, 14, 8, 0, 0), DateTimeKind.Utc),
                        EndDate=DateTime.SpecifyKind(new DateTime(2023, 7, 14, 14, 0, 0), DateTimeKind.Utc),
                        Description="Randonnée dans un parc naturel avec des chutes d'eau spectaculaires", Cost=50 },
                    new() { Name="Visite de la cave à vin", TripId=1, Location="Split, Croatie",
                        StartDate=DateTime.SpecifyKind(new DateTime(2023, 7, 15, 15, 0, 0), DateTimeKind.Utc),
                        EndDate=DateTime.SpecifyKind(new DateTime(2023, 7, 15, 18, 0, 0), DateTimeKind.Utc),
                        Description="Dégustation de vins locaux et visite d'une cave traditionnelle", Cost=60 },

                    // Activities for User 2 - Trip 1 (Escapade romantique à Paris)
                    new() { Name="Visite de la Tour Eiffel", TripId=4, Location="Paris, France",
                        StartDate=DateTime.SpecifyKind(new DateTime(2024, 2, 15, 10, 0, 0), DateTimeKind.Utc),
                        EndDate=DateTime.SpecifyKind(new DateTime(2024, 2, 15, 12, 0, 0), DateTimeKind.Utc),
                        Description="Montée au sommet de la Tour Eiffel et vue panoramique sur la ville", Cost=30 },
                    new() { Name="Croisière sur la Seine", TripId=4, Location="Paris, France",
                        StartDate=DateTime.SpecifyKind(new DateTime(2024, 2, 16, 14, 0, 0), DateTimeKind.Utc),
                        EndDate=DateTime.SpecifyKind(new DateTime(2024, 2, 16, 16, 0, 0), DateTimeKind.Utc),
                        Description="Croisière romantique sur la Seine, vue des monuments emblématiques", Cost=50 },

                    // Activities for User 2 - Trip 2 (Road trip en Californie)
                    new() { Name="Visite de l'Observatoire Griffith", TripId=5, Location="Los Angeles, États-Unis",
                        StartDate=DateTime.SpecifyKind(new DateTime(2023, 9, 2, 10, 0, 0), DateTimeKind.Utc),
                        EndDate=DateTime.SpecifyKind(new DateTime(2023, 9, 2, 13, 0, 0), DateTimeKind.Utc),
                        Description="Visite de l'observatoire et vue imprenable sur Los Angeles", Cost=40 },
                    new() { Name="Excursion au parc national de Yosemite", TripId=5, Location="Yosemite, États-Unis",
                        StartDate=DateTime.SpecifyKind(new DateTime(2023, 9, 5, 7, 0, 0), DateTimeKind.Utc),
                        EndDate=DateTime.SpecifyKind(new DateTime(2023, 9, 5, 18, 0, 0), DateTimeKind.Utc),
                        Description="Randonnée et exploration des célèbres formations rocheuses", Cost=120 },

                    // Activities for User 1 - Trip 2 (Week-end à Amsterdam)
                    new() { Name="Visite du Rijksmuseum", TripId=2, Location="Amsterdam, Pays-Bas",
                        StartDate=DateTime.SpecifyKind(new DateTime(2024, 4, 6, 9, 0, 0), DateTimeKind.Utc),
                        EndDate=DateTime.SpecifyKind(new DateTime(2024, 4, 6, 12, 0, 0), DateTimeKind.Utc),
                        Description="Visite du musée Rijksmuseum et découverte de l'art néerlandais", Cost=790 },
                    new() { Name="Balade à vélo dans le Vondelpark", TripId=2, Location="Amsterdam, Pays-Bas",
                        StartDate=DateTime.SpecifyKind(new DateTime(2024, 4, 6, 14, 0, 0), DateTimeKind.Utc),
                        EndDate=DateTime.SpecifyKind(new DateTime(2024, 4, 6, 16, 0, 0), DateTimeKind.Utc),
                        Description="Promenade à vélo dans le parc le plus célèbre d'Amsterdam", Cost=15 },

                    // Activities for User 1 - Trip 3 (Aventure au Japon)
                    new() { Name="Visite du temple Kinkaku-ji", TripId=3, Location="Kyoto, Japon",
                        StartDate=DateTime.SpecifyKind(new DateTime(2025, 9, 16, 8, 0, 0), DateTimeKind.Utc),
                        EndDate=DateTime.SpecifyKind(new DateTime(2025, 9, 16, 11, 0, 0), DateTimeKind.Utc),
                        Description="Visite du temple doré et des jardins zen", Cost=25 },
                    new() { Name="Excursion en train à Nara", TripId=3, Location="Nara, Japon",
                        StartDate=DateTime.SpecifyKind(new DateTime(2025, 9, 17, 9, 0, 0), DateTimeKind.Utc),
                        EndDate=DateTime.SpecifyKind(new DateTime(2025, 9, 17, 15, 0, 0), DateTimeKind.Utc),
                        Description="Excursion à Nara pour voir les cerfs et visiter les temples", Cost=70 }
                };

                context.Activities.AddRange(activities);
                context.SaveChanges();
            }
        }
    }
}
