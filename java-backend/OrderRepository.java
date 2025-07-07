package com.sweetdelights.bakery.repository;

import com.sweetdelights.bakery.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Order findByOrderId(String orderId);
    List<Order> findAllByOrderByCreatedAtDesc();
    List<Order> findByCustomerEmailOrderByCreatedAtDesc(String customerEmail);
    List<Order> findByStatusOrderByCreatedAtDesc(String status);
}