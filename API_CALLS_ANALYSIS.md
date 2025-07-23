# Complete API Calls Analysis for Backend Integration

This document lists all API calls made in the frontend application, their expected data structures, and parameters to help with backend implementation.

## Base Configuration
- **Base URL**: `import.meta.env.VITE_API_URL` or `'https://your-backend-api.com/api'`
- **Timeout**: 10000ms
- **Headers**: `'Content-Type': 'application/json'`
- **Authorization**: `Bearer ${token}` (added via interceptor)

## 1. Authentication API (`/auth`)

### POST `/auth/login`
**Purpose**: User login
**Data**:
```json
{
  "email": "string",
  "password": "string"
}
```
**Expected Response**:
```json
{
  "user": {
    "id": "number",
    "name": "string",
    "email": "string",
    "role": "BUYER|SELLER|ADMIN",
    "kycStatus": "PENDING|APPROVED|REJECTED",
    "phone": "string",
    "companyName": "string"
  },
  "token": "string"
}
```

### POST `/auth/register`
**Purpose**: User registration
**Data**:
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "confirmPassword": "string",
  "phone": "string",
  "companyName": "string", // Required for SELLER role
  "role": "BUYER|SELLER"
}
```
**Expected Response**: Same as login

### POST `/auth/demo-login?role={role}`
**Purpose**: Demo login for testing
**Query Params**: `role` (BUYER|SELLER|ADMIN)
**Expected Response**: Same as login

### POST `/auth/logout`
**Purpose**: User logout
**Data**: None
**Expected Response**: Success message

### POST `/auth/refresh`
**Purpose**: Refresh JWT token
**Data**: None
**Expected Response**:
```json
{
  "token": "string"
}
```

## 2. Public API (`/public`) - No Authentication Required

### GET `/public/listings`
**Purpose**: Get all public listings with filters
**Query Params**:
```
category: string (optional)
location: string (optional)
minPrice: number (optional)
maxPrice: number (optional)
keyword: string (optional)
page: number (optional)
limit: number (optional)
sortBy: string (optional) - newest|oldest|price-low|price-high|revenue-high|revenue-low
```
**Expected Response**:
```json
{
  "listings": [
    {
      "id": "number",
      "title": "string",
      "description": "string",
      "category": "string",
      "location": "string",
      "askingPrice": "number",
      "revenue": "number", // Monthly revenue
      "verified": "boolean",
      "seller": {
        "name": "string",
        "verified": "boolean"
      },
      "tags": ["string"],
      "createdAt": "string", // ISO date
      "views": "number"
    }
  ],
  "totalCount": "number",
  "currentPage": "number",
  "totalPages": "number"
}
```

### GET `/public/listings/{id}`
**Purpose**: Get single listing details
**Path Params**: `id` (listing ID)
**Expected Response**:
```json
{
  "id": "number",
  "title": "string",
  "description": "string",
  "category": "string",
  "location": "string",
  "askingPrice": "number",
  "revenue": "number",
  "monthlyProfit": "number",
  "yearEstablished": "number",
  "employees": "number",
  "website": "string",
  "reasonForSelling": "string",
  "assetsIncluded": "string",
  "growthOpportunities": "string",
  "verified": "boolean",
  "seller": {
    "id": "number",
    "name": "string",
    "verified": "boolean"
  },
  "tags": ["string"],
  "createdAt": "string",
  "views": "number",
  "status": "active|pending_review|sold|inactive"
}
```

### GET `/public/categories`
**Purpose**: Get all available categories
**Expected Response**:
```json
{
  "categories": ["SaaS", "E-commerce", "Mobile App", "EdTech", "FinTech", "HealthTech", "Marketplace"]
}
```

### GET `/public/stats`
**Purpose**: Get platform statistics
**Expected Response**:
```json
{
  "totalListings": "number",
  "successfulDeals": "number",
  "verifiedUsers": "number",
  "totalValue": "number"
}
```

## 3. Buyer API (`/buyer`) - Requires BUYER role

### POST `/buyer/offers`
**Purpose**: Create a new offer
**Data**:
```json
{
  "listingId": "number",
  "offerAmount": "number",
  "message": "string",
  "timeline": "string", // 15-days|30-days|45-days|60-days|90-days
  "financingType": "string", // cash|installments|earn-out|mixed
  "dueDate": "string" // ISO date
}
```
**Expected Response**:
```json
{
  "id": "number",
  "listingId": "number",
  "buyerId": "number",
  "offerAmount": "number",
  "message": "string",
  "timeline": "string",
  "financingType": "string",
  "dueDate": "string",
  "status": "pending|accepted|rejected|expired",
  "createdAt": "string"
}
```

### GET `/buyer/offers`
**Purpose**: Get buyer's offers
**Query Params**:
```
status: string (optional) - pending|accepted|rejected|expired
page: number (optional)
limit: number (optional)
```
**Expected Response**:
```json
{
  "offers": [
    {
      "id": "number",
      "listingTitle": "string",
      "offerAmount": "number",
      "status": "string",
      "submittedAt": "string",
      "expiresAt": "string"
    }
  ],
  "totalCount": "number"
}
```

### GET `/buyer/offers/{id}`
**Purpose**: Get specific offer details
**Path Params**: `id` (offer ID)
**Expected Response**: Full offer object with listing details

### PUT `/buyer/offers/{id}`
**Purpose**: Update an offer
**Path Params**: `id` (offer ID)
**Data**: Same as create offer
**Expected Response**: Updated offer object

### DELETE `/buyer/offers/{id}`
**Purpose**: Delete/withdraw an offer
**Path Params**: `id` (offer ID)
**Expected Response**: Success message

### GET `/buyer/saved-listings`
**Purpose**: Get buyer's saved listings
**Expected Response**:
```json
{
  "savedListings": [
    {
      "listingId": "number",
      "listing": {}, // Full listing object
      "savedAt": "string",
      "notes": "string"
    }
  ]
}
```

### POST `/buyer/saved-listings/{listingId}`
**Purpose**: Save a listing
**Path Params**: `listingId`
**Data**:
```json
{
  "notes": "string" // Optional
}
```
**Expected Response**: Success message

### DELETE `/buyer/saved-listings/{listingId}`
**Purpose**: Remove saved listing
**Path Params**: `listingId`
**Expected Response**: Success message

### GET `/buyer/dashboard`
**Purpose**: Get buyer dashboard data
**Expected Response**:
```json
{
  "stats": {
    "totalOffers": "number",
    "activeOffers": "number",
    "savedListings": "number",
    "messagesUnread": "number"
  },
  "recentOffers": [], // Array of recent offers
  "recommendedListings": [] // Array of recommended listings
}
```

## 4. Seller API (`/seller`) - Requires SELLER role

### POST `/seller/listings`
**Purpose**: Create a new listing
**Data**:
```json
{
  "title": "string",
  "description": "string",
  "category": "string",
  "location": "string",
  "askingPrice": "number",
  "monthlyRevenue": "number",
  "monthlyProfit": "number",
  "yearEstablished": "number",
  "employees": "number",
  "website": "string",
  "reasonForSelling": "string",
  "assetsIncluded": "string",
  "growthOpportunities": "string"
}
```
**Expected Response**:
```json
{
  "id": "number",
  "title": "string",
  "status": "pending_review",
  "createdAt": "string",
  // ... other listing fields
}
```

### GET `/seller/listings`
**Purpose**: Get seller's listings
**Expected Response**:
```json
{
  "listings": [
    {
      "id": "number",
      "title": "string",
      "askingPrice": "number",
      "monthlyRevenue": "number",
      "views": "number",
      "offers": "number",
      "status": "string",
      "createdAt": "string"
    }
  ]
}
```

### GET `/seller/listings/{id}`
**Purpose**: Get specific listing details
**Path Params**: `id` (listing ID)
**Expected Response**: Full listing object

### PUT `/seller/listings/{id}`
**Purpose**: Update a listing
**Path Params**: `id` (listing ID)
**Data**: Same as create listing
**Expected Response**: Updated listing object

### DELETE `/seller/listings/{id}`
**Purpose**: Delete a listing
**Path Params**: `id` (listing ID)
**Expected Response**: Success message

### GET `/seller/offers`
**Purpose**: Get offers received on seller's listings
**Query Params**:
```
listingId: number (optional)
status: string (optional)
page: number (optional)
limit: number (optional)
```
**Expected Response**:
```json
{
  "offers": [
    {
      "id": "number",
      "listingTitle": "string",
      "buyerName": "string",
      "offerAmount": "number",
      "status": "string",
      "submittedAt": "string",
      "message": "string"
    }
  ]
}
```

### GET `/seller/listings/{listingId}/offers`
**Purpose**: Get offers for specific listing
**Path Params**: `listingId`
**Expected Response**: Array of offers for that listing

### PUT `/seller/offers/{id}/status?status={status}`
**Purpose**: Update offer status (accept/reject)
**Path Params**: `id` (offer ID)
**Query Params**: `status` (accepted|rejected)
**Expected Response**: Updated offer object

### GET `/seller/dashboard`
**Purpose**: Get seller dashboard data
**Expected Response**:
```json
{
  "stats": {
    "totalListings": "number",
    "activeListings": "number",
    "totalViews": "number",
    "totalOffers": "number"
  },
  "recentOffers": [], // Array of recent offers
  "listingPerformance": [] // Array of listing performance data
}
```

### GET `/seller/listings/{listingId}/analytics`
**Purpose**: Get analytics for specific listing
**Path Params**: `listingId`
**Expected Response**:
```json
{
  "views": {
    "total": "number",
    "daily": [{"date": "string", "views": "number"}]
  },
  "offers": {
    "total": "number",
    "byStatus": {"pending": "number", "accepted": "number", "rejected": "number"}
  },
  "engagement": {
    "saves": "number",
    "messages": "number"
  }
}
```

## 5. Chat API (`/chat`)

### GET `/chat/messages/{listingId}/{userId}`
**Purpose**: Get messages for a conversation
**Path Params**: `listingId`, `userId`
**Expected Response**:
```json
{
  "messages": [
    {
      "id": "number",
      "senderId": "number",
      "content": "string",
      "timestamp": "string",
      "type": "text|file"
    }
  ]
}
```

### POST `/chat/messages`
**Purpose**: Send a message
**Data**:
```json
{
  "listingId": "number",
  "receiverId": "number",
  "content": "string",
  "type": "text|file"
}
```
**Expected Response**: Created message object

### GET `/chat/users`
**Purpose**: Get chat users/conversations
**Expected Response**:
```json
{
  "conversations": [
    {
      "id": "number",
      "participant": {
        "name": "string",
        "role": "string",
        "avatar": "string",
        "online": "boolean"
      },
      "listingTitle": "string",
      "lastMessage": "string",
      "lastMessageTime": "string",
      "unreadCount": "number"
    }
  ]
}
```

### GET `/chat/unread-count`
**Purpose**: Get unread messages count
**Expected Response**:
```json
{
  "unreadCount": "number"
}
```

### PUT `/chat/messages/{messageId}/read`
**Purpose**: Mark message as read
**Path Params**: `messageId`
**Expected Response**: Success message

## 6. File Upload API (`/files`)

### POST `/files/upload/kyc/{documentType}`
**Purpose**: Upload KYC documents
**Path Params**: `documentType` (aadhar|pan|bank_statement|etc)
**Content-Type**: `multipart/form-data`
**Data**: FormData with file
**Expected Response**:
```json
{
  "fileUrl": "string",
  "fileName": "string",
  "fileSize": "number"
}
```

### POST `/files/upload/listing`
**Purpose**: Upload listing attachments
**Content-Type**: `multipart/form-data`
**Data**: FormData with file
**Expected Response**: Same as KYC upload

### POST `/files/upload/avatar`
**Purpose**: Upload user avatar
**Content-Type**: `multipart/form-data`
**Data**: FormData with file
**Expected Response**: Same as KYC upload

## 7. Payment API (`/payments`)

### POST `/payments/create-intent`
**Purpose**: Create payment intent
**Data**:
```json
{
  "amount": "number",
  "currency": "INR",
  "offerId": "number"
}
```
**Expected Response**:
```json
{
  "paymentIntentId": "string",
  "clientSecret": "string"
}
```

### POST `/payments/confirm`
**Purpose**: Confirm payment
**Data**:
```json
{
  "paymentIntentId": "string",
  "paymentMethodId": "string"
}
```
**Expected Response**:
```json
{
  "status": "succeeded|failed",
  "transactionId": "string"
}
```

### GET `/payments/history`
**Purpose**: Get payment history
**Expected Response**:
```json
{
  "payments": [
    {
      "id": "string",
      "amount": "number",
      "status": "string",
      "createdAt": "string",
      "description": "string"
    }
  ]
}
```

### POST `/payments/{paymentId}/refund`
**Purpose**: Refund payment
**Path Params**: `paymentId`
**Expected Response**: Refund confirmation

## 8. Admin API (`/admin`) - Requires ADMIN role

### GET `/admin/dashboard`
**Purpose**: Get admin dashboard data
**Expected Response**:
```json
{
  "stats": {
    "totalUsers": "number",
    "totalListings": "number",
    "totalTransactions": "number",
    "revenue": "number"
  },
  "recentActivity": []
}
```

### GET `/admin/users`
**Purpose**: Get all users
**Query Params**: `page`, `limit`, `role`, `status`
**Expected Response**: Paginated users list

### GET `/admin/users/{id}`
**Purpose**: Get user details
**Path Params**: `id`
**Expected Response**: Full user object

### PUT `/admin/users/{id}/status?status={status}`
**Purpose**: Update user status
**Path Params**: `id`
**Query Params**: `status` (active|suspended|banned)
**Expected Response**: Updated user object

### PUT `/admin/users/{id}/kyc-status?status={status}`
**Purpose**: Update KYC status
**Path Params**: `id`
**Query Params**: `status` (approved|rejected|pending)
**Expected Response**: Updated user object

### DELETE `/admin/users/{id}`
**Purpose**: Delete user
**Path Params**: `id`
**Expected Response**: Success message

### GET `/admin/listings`
**Purpose**: Get all listings for admin
**Query Params**: `page`, `limit`, `status`, `category`
**Expected Response**: Paginated listings list

### PUT `/admin/listings/{id}/status?status={status}`
**Purpose**: Update listing status
**Path Params**: `id`
**Query Params**: `status` (active|pending_review|rejected|sold)
**Expected Response**: Updated listing object

### DELETE `/admin/listings/{id}`
**Purpose**: Delete listing
**Path Params**: `id`
**Expected Response**: Success message

### GET `/admin/transactions`
**Purpose**: Get all transactions
**Query Params**: `page`, `limit`, `status`
**Expected Response**: Paginated transactions list

### GET `/admin/stats`
**Purpose**: Get system statistics
**Expected Response**: Comprehensive system stats

## 9. User Profile API (`/user`)

### GET `/user/profile`
**Purpose**: Get user profile
**Expected Response**:
```json
{
  "id": "number",
  "name": "string",
  "email": "string",
  "phone": "string",
  "company": "string",
  "bio": "string",
  "role": "string",
  "kycStatus": "string",
  "createdAt": "string"
}
```

### PUT `/user/profile`
**Purpose**: Update user profile
**Data**:
```json
{
  "name": "string",
  "phone": "string",
  "company": "string",
  "bio": "string"
}
```
**Expected Response**: Updated user object

### PUT `/user/change-password`
**Purpose**: Change password
**Data**:
```json
{
  "currentPassword": "string",
  "newPassword": "string"
}
```
**Expected Response**: Success message

### DELETE `/user/account`
**Purpose**: Delete user account
**Expected Response**: Success message

### GET `/user/notifications`
**Purpose**: Get user notifications
**Expected Response**:
```json
{
  "notifications": [
    {
      "id": "number",
      "type": "offer|message|verification",
      "title": "string",
      "message": "string",
      "read": "boolean",
      "createdAt": "string"
    }
  ]
}
```

### PUT `/user/notifications/{id}/read`
**Purpose**: Mark notification as read
**Path Params**: `id`
**Expected Response**: Success message

### PUT `/user/preferences`
**Purpose**: Update user preferences
**Data**:
```json
{
  "emailNotifications": "boolean",
  "pushNotifications": "boolean",
  "marketingEmails": "boolean"
}
```
**Expected Response**: Updated preferences

## Error Handling

All endpoints should handle errors consistently:

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "Resource not found"
}
```

### 400 Bad Request
```json
{
  "error": "Bad Request",
  "message": "Validation error",
  "details": {
    "field": "error message"
  }
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "Something went wrong"
}
```

## Authentication Flow

1. User logs in via `/auth/login` or `/auth/register`
2. Backend returns JWT token
3. Frontend stores token and adds to all subsequent requests via `Authorization: Bearer {token}`
4. Backend validates token on protected routes
5. Token refresh via `/auth/refresh` when needed

## File Upload Flow

1. Frontend creates FormData with file
2. Sets Content-Type to `multipart/form-data`
3. Backend processes file upload
4. Returns file URL for storage/reference

## Real-time Features (WebSocket)

Consider implementing WebSocket connections for:
- Real-time chat messages
- Live notifications
- Offer status updates
- Listing view counts

## Database Schema Considerations

Based on the API calls, you'll need these main entities:
- Users (buyers, sellers, admins)
- Listings
- Offers
- Messages/Conversations
- Notifications
- Payments/Transactions
- Files/Uploads
- User preferences