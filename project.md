flowchart TD
    Start([Project Initiation]) --> Planning
    
    subgraph Planning [Planning Phase]
        A1[Domain & Hosting Setup] --> A2[Tech Stack Selection]
        A2 --> A3[Database Schema Design]
        A3 --> A4[API Architecture Planning]
    end

    subgraph Setup [Development Setup]
        B1[GitHub Repository Creation]
        B2[Development Environment]
        B3[CI/CD Pipeline Setup]
        B4[Docker Configuration]
    end

    subgraph Frontend [Frontend Development]
        C1[Next.js Project Setup]
        C2[UI Component Library]
        C3[Authentication Flow]
        C4[Product Listing]
        C5[Shopping Cart]
        C6[Checkout Process]
    end

    subgraph Backend [Backend Development]
        D1[Database Setup]
        D2[User Management]
        D3[Product Management]
        D4[Order Processing]
        D5[Payment Integration]
    end

    subgraph Additional [Additional Features]
        E1[Search Implementation]
        E2[Recommendation Engine]
        E3[Email Notifications]
        E4[Analytics Setup]
    end

    subgraph Testing [Testing & Optimization]
        F1[Unit Testing]
        F2[Integration Testing]
        F3[Performance Testing]
        F4[Security Audit]
    end

    subgraph Launch [Launch Preparation]
        G1[SSL Setup]
        G2[CDN Configuration]
        G3[Monitoring Setup]
        G4[Backup System]
    end

    Planning --> Setup
    Setup --> Frontend
    Setup --> Backend
    Frontend --> Additional
    Backend --> Additional
    Additional --> Testing
    Testing --> Launch
    Launch --> Deploy([Production Deployment])

    style Start fill:#f5ebe0,stroke:#463f3a
    style Deploy fill:#f5ebe0,stroke:#463f3a
    
    classDef phase fill:#d5bdaf,stroke:#463f3a
    class Planning,Setup,Frontend,Backend,Additional,Testing,Launch phase