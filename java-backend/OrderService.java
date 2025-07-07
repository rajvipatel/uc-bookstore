package com.sweetdelights.bakery.service;

import com.sweetdelights.bakery.model.Order;
import com.sweetdelights.bakery.model.OrderItem;
import com.sweetdelights.bakery.repository.OrderRepository;
import com.sweetdelights.bakery.controller.OrderItemRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepository;
    
    public Order createOrder(Order order, List<OrderItemRequest> itemRequests) {
        // Save the order first
        Order savedOrder = orderRepository.save(order);
        
        // Create and save order items
        List<OrderItem> orderItems = itemRequests.stream()
            .map(itemRequest -> new OrderItem(
                savedOrder,
                itemRequest.getId(),
                itemRequest.getName(),
                itemRequest.getPrice(),
                itemRequest.getQuantity()
            ))
            .collect(Collectors.toList());
        
        savedOrder.setItems(orderItems);
        
        // Send confirmation email (mock)
        sendOrderConfirmationEmail(savedOrder);
        
        return orderRepository.save(savedOrder);
    }
    
    public Order findByOrderId(String orderId) {
        return orderRepository.findByOrderId(orderId);
    }
    
    public List<Order> getAllOrders() {
        return orderRepository.findAllByOrderByCreatedAtDesc();
    }
    
    public Order updateOrderStatus(String orderId, String status) {
        Order order = orderRepository.findByOrderId(orderId);
        if (order != null) {
            order.setStatus(status);
            return orderRepository.save(order);
        }
        throw new RuntimeException("Order not found: " + orderId);
    }
    
    private void sendOrderConfirmationEmail(Order order) {
        // Mock email service
        System.out.println("Sending confirmation email to: " + order.getCustomerEmail());
        System.out.println("Order ID: " + order.getOrderId());
        System.out.println("Total: $" + order.getTotalAmount());
        
        // In a real application, you would integrate with an email service like:
        // - SendGrid
        // - Amazon SES
        // - JavaMail API
    }
    
    public void processPayment(String cardNumber, String expiryDate, String cvv, Double amount) {
        // Mock payment processing
        System.out.println("Processing payment of $" + amount);
        System.out.println("Card ending in: " + cardNumber.substring(cardNumber.length() - 4));
        
        // In a real application, you would integrate with a payment processor like:
        // - Stripe
        // - PayPal
        // - Square
        
        // Simulate payment processing delay
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        System.out.println("Payment processed successfully");
    }
}