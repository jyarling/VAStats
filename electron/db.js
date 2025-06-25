"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPilots = getPilots;
exports.getAircraft = getAircraft;
exports.getFlights = getFlights;
exports.getEvents = getEvents;
exports.getNotifications = getNotifications;
exports.getAcarsLogs = getAcarsLogs;
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    connectionString: 'postgres://user:password@localhost:5432/VAStats',
});
async function getPilots() {
    try {
        const { rows } = await pool.query('SELECT * FROM pilots');
        return rows;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}
async function getAircraft() {
    try {
        const { rows } = await pool.query('SELECT * FROM aircraft');
        return rows;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}
async function getFlights() {
    try {
        const { rows } = await pool.query('SELECT * FROM flights');
        return rows;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}
async function getEvents() {
    try {
        const { rows } = await pool.query('SELECT * FROM events');
        return rows;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}
async function getNotifications() {
    try {
        const { rows } = await pool.query('SELECT * FROM notifications');
        return rows;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}
async function getAcarsLogs(flightId) {
    try {
        const { rows } = await pool.query('SELECT * FROM acars_logs WHERE flight_id = $1', [flightId]);
        return rows;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}
