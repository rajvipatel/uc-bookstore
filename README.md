# Sweet Delights Bakery

A modern, responsive website for selling baked goods with a Java Spring Boot backend and vanilla JavaScript frontend.

## Features

### Frontend (JavaScript)
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Product Catalog**: Display of bakery items with images, descriptions, and prices
- **Shopping Cart**: Add/remove items, update quantities, persistent cart storage
- **Checkout Process**: Customer information and payment form
- **Order Confirmation**: Success page with order ID
- **Modern UI**: Clean, bakery-themed design with smooth animations

### Backend (Java Spring Boot)
- **RESTful API**: Clean API endpoints for order management
- **Order Processing**: Complete order lifecycle management
- **Database Integration**: H2 in-memory database for development
- **CORS Support**: Configured for frontend integration
- **Error Handling**: Comprehensive error handling and validation

## Tech Stack

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **Vanilla JavaScript**: No frameworks, pure JS for maximum performance
- **Local Storage**: Cart persistence across sessions

### Backend
- **Java 11+**: Modern Java features
- **Spring Boot 2.7**: Rapid application development
- **Spring Data JPA**: Database abstraction layer
- **H2 Database**: In-memory database for development
- **Maven**: Dependency management and build tool

## Getting Started

### Frontend Setup
1. Open `index.html` in a web browser
2. The frontend will work standalone with mock data
3. For full functionality, start the Java backend

### Backend Setup
1. Ensure Java 11+ is installed
2. Navigate to the `java-backend` directory
3. Run the application:
   ```bash
   mvn spring-boot:run
   ```
4. The API will be available at `http://localhost:8080`

### Database Access
- H2 Console: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:bakery`
- Username: `sa`
- Password: (empty)

## API Endpoints

### Orders
- `POST /api/orders` - Create a new order
- `GET /api/orders` - Get all orders
- `GET /api/orders/{orderId}` - Get specific order
- `PUT /api/orders/{orderId}/status` - Update order status

### Example Order Request
```json
{
  "customer": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "555-1234",
    "address": {
      "street": "123 Main St",
      "city": "Anytown",
      "zip": "12345"
    }
  },
  "items": [
    {
      "id": 1,
      "name": "Chocolate Croissant",
      "price": 4.50,
      "quantity": 2
    }
  ],
  "total": 9.00,
  "payment": {
    "cardNumber": "1234567890123456",
    "expiryDate": "12/25",
    "cvv": "123"
  }
}
```

## Project Structure

```
sweet-delights-bakery/
├── index.html              # Main HTML file
├── styles.css              # CSS styles
├── script.js               # JavaScript functionality
├── java-backend/           # Java Spring Boot backend
│   ├── src/main/java/
│   │   └── com/sweetdelights/bakery/
│   │       ├── BakeryApplication.java
│   │       ├── controller/
│   │       │   └── OrderController.java
│   │       ├── model/
│   │       │   ├── Order.java
│   │       │   └── OrderItem.java
│   │       ├── repository/
│   │       │   └── OrderRepository.java
│   │       └── service/
│   │           └── OrderService.java
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
└── README.md
```

## Features in Detail

### Product Management
- 8 sample bakery products with descriptions and prices
- Emoji-based product images for visual appeal
- Category-based organization

### Shopping Cart
- Add/remove items with quantity controls
- Real-time price calculations
- Persistent storage using localStorage
- Visual feedback for user actions

### Order Processing
- Two-step checkout process
- Customer information collection
- Payment form with validation
- Order confirmation with unique ID

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interface
- Optimized for all screen sizes

## Customization

### Adding New Products
Edit the `products` array in `script.js`:
```javascript
{
    id: 9,
    name: "New Product",
    description: "Product description",
    price: 5.99,
    emoji: "🥧"
}
```

### Styling Changes
Modify `styles.css` to customize:
- Color scheme (currently brown/orange bakery theme)
- Typography (Georgia serif font)
- Layout and spacing
- Animations and transitions

### Backend Configuration
Update `application.properties` for:
- Database settings
- Server port
- CORS configuration
- Logging levels

## Production Deployment

### Frontend
- Deploy static files to any web server
- Configure API endpoint URL in `script.js`
- Enable HTTPS for secure payment processing

### Backend
- Package as JAR: `mvn clean package`
- Deploy to cloud platforms (AWS, Heroku, etc.)
- Configure production database (PostgreSQL, MySQL)
- Set up environment variables for sensitive data

## Security Considerations

- **Payment Processing**: Integrate with secure payment providers (Stripe, PayPal)
- **Data Validation**: Server-side validation for all inputs
- **HTTPS**: Enable SSL/TLS for production
- **Authentication**: Add user authentication for order tracking
- **Rate Limiting**: Implement API rate limiting

## Future Enhancements

- User authentication and order history
- Real-time order tracking
- Email notifications
- Inventory management
- Admin dashboard
- Payment gateway integration
- Mobile app development

## License

This project is open source and available under the MIT License.