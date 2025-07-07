package com.sweetdelights.bakery.controller;

import com.sweetdelights.bakery.model.Order;
import com.sweetdelights.bakery.model.OrderItem;
import com.sweetdelights.bakery.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class OrderController {
    
    @Autowired
    private OrderService orderService;
    
    @PostMapping("/orders")
    public ResponseEntity<Map<String, Object>> createOrder(@RequestBody OrderRequest orderRequest) {
        try {
            // Create order from request
            Order order = new Order(
                orderRequest.getCustomer().getName(),
                orderRequest.getCustomer().getEmail(),
                orderRequest.getCustomer().getPhone(),
                orderRequest.getCustomer().getAddress().getStreet(),
                orderRequest.getCustomer().getAddress().getCity(),
                orderRequest.getCustomer().getAddress().getZip(),
                orderRequest.getTotal()
            );
            
            // Save order
            Order savedOrder = orderService.createOrder(order, orderRequest.getItems());
            
            // Prepare response
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("orderId", savedOrder.getOrderId());
            response.put("message", "Order created successfully");
            response.put("estimatedDelivery", "30-45 minutes");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Failed to create order: " + e.getMessage());
            
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    @GetMapping("/orders/{orderId}")
    public ResponseEntity<Order> getOrder(@PathVariable String orderId) {
        Order order = orderService.findByOrderId(orderId);
        if (order != null) {
            return ResponseEntity.ok(order);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }
    
    @PutMapping("/orders/{orderId}/status")
    public ResponseEntity<Map<String, Object>> updateOrderStatus(
            @PathVariable String orderId, 
            @RequestBody Map<String, String> statusUpdate) {
        
        try {
            Order order = orderService.updateOrderStatus(orderId, statusUpdate.get("status"));
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("orderId", order.getOrderId());
            response.put("status", order.getStatus());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Failed to update order status: " + e.getMessage());
            
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
}

// Request DTOs
class OrderRequest {
    private CustomerInfo customer;
    private List<OrderItemRequest> items;
    private Double total;
    private PaymentInfo payment;
    
    // Getters and Setters
    public CustomerInfo getCustomer() { return customer; }
    public void setCustomer(CustomerInfo customer) { this.customer = customer; }
    
    public List<OrderItemRequest> getItems() { return items; }
    public void setItems(List<OrderItemRequest> items) { this.items = items; }
    
    public Double getTotal() { return total; }
    public void setTotal(Double total) { this.total = total; }
    
    public PaymentInfo getPayment() { return payment; }
    public void setPayment(PaymentInfo payment) { this.payment = payment; }
}

class CustomerInfo {
    private String name;
    private String email;
    private String phone;
    private AddressInfo address;
    
    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    
    public AddressInfo getAddress() { return address; }
    public void setAddress(AddressInfo address) { this.address = address; }
}

class AddressInfo {
    private String street;
    private String city;
    private String zip;
    
    // Getters and Setters
    public String getStreet() { return street; }
    public void setStreet(String street) { this.street = street; }
    
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    
    public String getZip() { return zip; }
    public void setZip(String zip) { this.zip = zip; }
}

class OrderItemRequest {
    private Long id;
    private String name;
    private Double price;
    private Integer quantity;
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
}

class PaymentInfo {
    private String cardNumber;
    private String expiryDate;
    private String cvv;
    
    // Getters and Setters
    public String getCardNumber() { return cardNumber; }
    public void setCardNumber(String cardNumber) { this.cardNumber = cardNumber; }
    
    public String getExpiryDate() { return expiryDate; }
    public void setExpiryDate(String expiryDate) { this.expiryDate = expiryDate; }
    
    public String getCvv() { return cvv; }
    public void setCvv(String cvv) { this.cvv = cvv; }
}