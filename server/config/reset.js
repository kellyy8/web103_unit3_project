import pool from './database.js'
import './dotenv.js'
import events from '../data/events.js'
import locations from '../data/locations.js'

// create the tables to store the events and locations data
async function createDatabase() {
    const createEventsTableQuery = `
        DROP TABLE IF EXISTS events;

        CREATE TABLE IF NOT EXISTS events (
            id VARCHAR(50) PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            start_at TIMESTAMPTZ NOT NULL,
            image TEXT NOT NULL,
            address TEXT NOT NULL,
            city TEXT NOT NULL,
            state TEXT NOT NULL,
            zip TEXT NOT NULL
        )
    `

    const createLocationsTableQuery = `
        DROP TABLE IF EXISTS locations;

        CREATE TABLE IF NOT EXISTS locations (
            id VARCHAR(50) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address TEXT NOT NULL,
            city TEXT NOT NULL,
            state TEXT NOT NULL,
            zip TEXT NOT NULL,
            image TEXT NOT NULL
        )
    `

    try {
        await pool.query(createEventsTableQuery)
        console.log('✓ Database "Events" table created successfully.')
        await pool.query(createLocationsTableQuery)
        console.log('✓ Database "Locations" table created successfully.')
    }
    catch (error) {
        console.log('Error creating database:', error)
    }
}

async function seedDatabase() {
    try {
        await createDatabase()
        console.log('Seeding database...')

        for (const event of events) {
            const insertQuery = `
                INSERT INTO events (id, title, start_at, image, address, city, state, zip)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            `
            const values = [event.id, event.title, event.start_at, event.image, event.address, event.city, event.state, event.zip]
            await pool.query(insertQuery, values)
            console.log(`✓ Inserted event: ${event.title}`)
        }
        console.log('\n✓ "Events" table seeded successfully!')
        
        for (const location of locations) {
            const insertQuery = `
                INSERT INTO locations (id, name, address, city, state, zip, image)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
            `
            const values = [location.id, location.name, location.address, location.city, location.state, location.zip, location.image]
            await pool.query(insertQuery, values)
            console.log(`✓ Inserted location: ${location.name}`)
        }
        console.log('\n✓ "Locations" table seeded successfully!')

        console.log('\n✓ Database reset and seeded successfully!')
    }
    catch (error) {
        console.log('Error seeding database:', error)
    }
    finally {
        await pool.end()
        process.exit(0)
    }
}

seedDatabase()