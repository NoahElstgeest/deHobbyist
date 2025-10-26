package com.example.dehobbyistback.config;

import com.example.dehobbyistback.dao.ProductDao;
import com.example.dehobbyistback.dao.UserDao;
import com.example.dehobbyistback.model.Product;
import com.example.dehobbyistback.model.Role;
import com.example.dehobbyistback.model.User;
import jakarta.annotation.PostConstruct;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import lombok.RequiredArgsConstructor;
import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
public class Seeder {
    private final UserDao userDao;
    private final ProductDao productDao;

    @PostConstruct
    public void seedDatabase() {
        clearDatabase();
        seedUsers();
        seedProducts();
    }

    private void clearDatabase() {
        userDao.deleteAllUsers();
        productDao.deleteAllProducts();
    }

    private void seedUsers() {
        if (userDao.findByUsername("admin").isEmpty()) {
            User admin = new User("admin", "admin@example.com", "admin123", Role.ADMIN);
            userDao.saveUser(admin);
        }

        if (userDao.findByUsername("customer").isEmpty()) {
            User customer = new User("customer", "customer@example.com", "customer123", Role.CUSTOMER);
            userDao.saveUser(customer);
        }
    }

    private void seedProducts() {
        if (productDao.getAllProducts().isEmpty()) {
            List<Product> products = List.of(
                    new Product("Acrylverf Set", "Een set van 12 levendige acrylverven voor miniaturen en modellen.", new BigDecimal("19.99"), 50, "https://cdn.webshopapp.com/shops/251673/files/339167091/image.jpg"),
                    new Product("Hobby Messen Set", "Precisie hobbymes set met verwisselbare mesjes.", new BigDecimal("14.99"), 30, "https://www.vbs-hobby.nl/media/prodimg/10/prodimg/thumbs/1140026_7481065.jpg"),
                    new Product("Houtbrandset", "Complete houtbrandgereedschap set voor pyrografie kunst.", new BigDecimal("29.99"), 20, "https://media.s-bol.com/31RL9lv3DE3Q/168x166.jpg"),
                    new Product("RC Auto Kit", "Bouw-je-eigen op afstand bestuurbare auto kit met elektrische motor.", new BigDecimal("79.99"), 15, "https://ae01.alicdn.com/kf/S5bfc20846db84d3b8cdccbc807b1b670n.jpg"),
                    new Product("Model Airbrush Set", "Professionele airbrush kit voor model schilderen.", new BigDecimal("49.99"), 25, "https://modelbouw-dordrecht.nl//Files/2/27000/27563/ProductPhotos/Source/1785558657.jpg"),
                    new Product("DIY Kaarsen Maken Kit", "Complete set om geurige kaarsen thuis te maken.", new BigDecimal("24.99"), 40, "https://media.s-bol.com/qpj549Mrxm0p/JY4lDo/550x549.jpg"),
                    new Product("Resin Gieten Starterkit", "Gebruiksvriendelijke resin gietset voor sieraden en kunst.", new BigDecimal("34.99"), 35, "https://foamatelier.nl/basis/data/articles/images/lightbox/big/cc-starter-kit-resin---hars-gieten_113844_0.jpg?h=a3c077eb"),
                    new Product("Naaimachine", "Compacte naaimachine voor beginners en hobbyisten.", new BigDecimal("99.99"), 10, "https://ingenaaimachines.nl/wp-content/uploads/2020/04/Bernina-335-INGEnaaimachines-scaled.jpg"),
                    new Product("3D Print Filament", "Hoogwaardige PLA filament voor 3D printen.", new BigDecimal("22.99"), 60, "https://m.media-amazon.com/images/I/815n00XCUEL.jpg"),
                    new Product("Miniatuur Boetseer Gereedschap", "Set van boetseergereedschap voor klei en model detaillering.", new BigDecimal("18.99"), 50, "https://artjo.nl/cdn/shop/files/hoofd_1024x1024.jpg?v=1698698971")
            );
            products.forEach(productDao::saveProduct);
        }
    }
}