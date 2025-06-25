import { Pool } from 'pg';
import log from 'electron-log';

const pool: Pool = new Pool({
  connectionString: 'postgres://user:password@localhost:5432/VAStats',
});

export async function getPilots(): Promise<any[]> {
  try {
    const { rows } = await pool.query('SELECT * FROM pilots');
    return rows;
  } catch (error) {
    log.error(error);
    throw error;
  }
}

export async function getAircraft(): Promise<any[]> {
  try {
    const { rows } = await pool.query('SELECT * FROM aircraft');
    return rows;
  } catch (error) {
    log.error(error);
    throw error;
  }
}

export async function getFlights(): Promise<any[]> {
  try {
    const { rows } = await pool.query('SELECT * FROM flights');
    return rows;
  } catch (error) {
    log.error(error);
    throw error;
  }
}

export async function getEvents(): Promise<any[]> {
  try {
    const { rows } = await pool.query('SELECT * FROM events');
    return rows;
  } catch (error) {
    log.error(error);
    throw error;
  }
}

export async function getNotifications(): Promise<any[]> {
  try {
    const { rows } = await pool.query('SELECT * FROM notifications');
    return rows;
  } catch (error) {
    log.error(error);
    throw error;
  }
}

export async function getAcarsLogs(flightId: number): Promise<any[]> {
  try {
    const { rows } = await pool.query('SELECT * FROM acars_logs WHERE flight_id = $1', [flightId]);
    return rows;
  } catch (error) {
    log.error(error);
    throw error;
  }
}
