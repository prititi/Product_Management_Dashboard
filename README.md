# Product Management Dashboard

## Overview
The Product Management Dashboard is a web application that allows users to manage products efficiently. The dashboard includes features for adding, updating, deleting, and displaying product details in a structured tabular format. Users can search, sort, and filter products for better visibility. The application ensures responsiveness across different screen sizes.

## Frontend Features

### Login Page
- **User Authentication**: Secure login form for users.
- **Session Management**: Uses React Context API to manage user sessions.

### Dashboard
- **Product Table**: Displays product details with the following fields:
  - Product Name
  - Price
  - Category
  - Stock Quantity
  - Actions (Edit/Delete)
- **Add Product**: A form to add new products.
- **Update Product**: Inline editing or a modal to modify product details.
- **Delete Product**: A delete button for each product with a confirmation dialog.

### Search and Sort
- **Search Functionality**: Filter products based on Product Name or Category.
- **Sorting**: Column-based sorting for:
  - Product Name
  - Price
  - Stock Quantity
  - Category

## Backend Features

### Data Management
- **API Fetching & Caching**: Uses SWR to fetch and cache product data from a mock API or locally defined API routes.
- **Real-time Updates**: Ensures data updates (add, update, delete) are reflected using SWR’s revalidation mechanism.

### API Endpoints
- **Fetch Products**: GET `/products`
- **Add Product**: POST `/products`
- **Update Product**: PUT `/products/:id`
- **Delete Product**: DELETE `/products/:id`

## Enhancements (Optional but Encouraged)
- **Pagination**: Implement pagination or infinite scrolling for better performance.
- **Low Stock Highlighting**: Highlight rows where stock is less than 5 items.
- **Category Filtering**: Dropdown filter to refine the product list.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) for package management.

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/prititi/Product_Management_Dashboard.git
    cd Product_Management_Dashboard
    ```

2. Install dependencies:
    ```sh
    npm install
    ```
    or
    ```sh
    yarn install
    ```

3. Start the development server:
    ```sh
    npm run dev
    ```

### Deployment
To deploy the application, follow the instructions for your hosting service (e.g., Vercel, Netlify). Ensure both frontend and backend are deployed and linked.

1. Backend deployment link:
    ```sh
    https://mock-api-4-b3a9.onrender.com/products
    ```

2. Frontend deployment link:  [https://product-management-dashboard-zeta.vercel.app/](https://product-management-dashboard-zeta.vercel.app/)
    
## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Contact
For any questions or suggestions, please contact us at support@productdashboard.com.

---

Thank you for using our Product Management Dashboard!

