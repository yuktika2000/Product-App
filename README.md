# Product Dashboard Application

A **Product Dashboard** built using **React**, **Redux Toolkit**, and **Tailwind CSS**.  
Allows users to browse products, search, filter, sort, view product details, and manage favorites.  
Includes **unit and integration tests** with coverage reports.

---

## Table of Contents

1. [Features](#features)  
2. [Tech Stack](#tech-stack)  
3. [Setup & Installation](#setup--installation)  
4. [Running the Application](#running-the-application)  
5. [Application Pages & Detailed Features](#application-pages--detailed-features)  
6. [State Management (Redux)](#state-management-redux)  
7. [Testing](#testing)  
8. [Project Structure](#project-structure)  
9. [Notes](#notes)  
10. [Assignment Deliverables Status](#assignment-deliverables-status)

---

## Features

### Dashboard (Product Listing Page)

- Displays products in a **responsive grid** (1–4 columns depending on screen size).  
- Each product card shows:
  - **Category badge** (top-right)  
  - **Image** with hover animation  
  - **Title** (truncated if longer than 35 characters)  
  - **Price**  
  - **Rating** (full stars and half stars)  
- **Search bar** to filter products by title in real-time.  
- **Category filter**: Electronics, Jewelery, Men Clothing, Women Clothing.  
- **Sort filter**: Price ascending or descending.  
- **No products found** message if no match.

---

### Product Details Page

- Displays full information about a product:
  - Image  
  - Title  
  - Price  
  - Category  
  - Rating (stars + review count)  
  - Description  
- **Favorites button**:  
  - If product is not in favorites → "Add to Favorites"  
  - If product is already in favorites → "Remove from Favorites"  
  - Button updates Redux state on click.  
- **Back button** navigates to Dashboard.  

---

### Favorites Page

- Displays all products added to favorites.  
- Each product card includes:
  - Image  
  - Title  
  - Price  
  - Category  
  - Rating (stars + count)  
  - **Remove button** (heart icon) to remove from favorites.  
- Grid layout same as Dashboard.  
- **Empty state message** when no favorites are added.  
- **Back button** navigates to Dashboard.

---

### Additional Functionalities

- **Search functionality**:  
  - Filters products by title in **case-insensitive** manner.  
- **Category filtering**:  
  - Filters products based on selected category.  
- **Sort functionality**:  
  - Sort products by price (Low → High / High → Low).   
- **Responsive UI**:  
  - Uses Tailwind CSS for responsive design, works on mobile, tablet, desktop.  
- **Loading and error states**:  
  - Spinner while fetching products  
  - Error message if API call fails

---

## Tech Stack

- **React** (Functional Components & Hooks)  
- **Redux Toolkit** (Slices, Actions, Selectors)  
- **React Router DOM** (Routing)  
- **Tailwind CSS** (Responsive styling)  
- **Jest & React Testing Library** (Unit & Integration Tests)  
- **Fake Store API** (Product Data)

---

## Setup & Installation

### Prerequisites

- Node.js v16+  
- npm or yarn  
- Git

### Installation Steps

1. Clone the repository:

git clone https://github.com/yuktika2000/Product-App.git
cd product-app
