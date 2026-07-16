/**
 * Grand Vista Hotel API — Vercel Serverless Function
 * In-memory storage (resets on cold start).
 * Frontend falls back to localStorage if API is unavailable.
 */

const CATEGORY_PRICE = { Single: 100, Double: 180, Family: 300, Elite: 600, Meeting: 500 };
let rooms = null;

function buildInventory() {
    const r = [];
    for (let fl = 1; fl <= 5; fl++) {
        for (let rm = 1; rm <= 20; rm++) {
            const roomNumber = fl * 100 + rm;
            const global = (fl - 1) * 20 + rm;
            let category;
            if (global <= 20) category = "Single";
            else if (global <= 40) category = "Double";
            else if (global <= 60) category = "Family";
            else if (global <= 95) category = "Elite";
            else category = "Meeting";
            r.push({
                roomNumber, floor: fl, category, price: CATEGORY_PRICE[category],
                checkedIn: false, guestName: "", guestPhone: "",
                checkInDate: "", checkOutDate: "", daysBooked: 0,
                paymentMethod: "None", orders: []
            });
        }
    }
    return r;
}

function json(res, status, data) {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}

function readBody(req) {
    return new Promise((resolve) => {
        let body = '';
        req.on('data', c => { body += c; });
        req.on('end', () => {
            try { resolve(JSON.parse(body || '{}')); }
            catch { resolve({}); }
        });
    });
}

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    if (!rooms) rooms = buildInventory();

    const url = req.url || '';
    const method = req.method;

    try {
        // GET /api/rooms — get all rooms
        if (method === 'GET' && url === '/api/rooms') {
            return json(res, 200, { rooms });
        }

        // POST /api/rooms — replace all rooms (full sync from client)
        if (method === 'POST' && url === '/api/rooms') {
            const body = await readBody(req);
            if (Array.isArray(body.rooms)) {
                rooms = body.rooms;
            }
            return json(res, 200, { success: true });
        }

        // GET /api/summary — stats
        if (method === 'GET' && url === '/api/summary') {
            const occupied = rooms.filter(r => r.checkedIn);
            const roomRevenue = occupied.reduce((s, r) => s + r.price * r.daysBooked, 0);
            const restRevenue = occupied.reduce((s, r) => s + (r.orders || []).reduce((a, o) => a + o.qty * o.unitPrice, 0), 0);
            return json(res, 200, {
                total: rooms.length,
                occupied: occupied.length,
                available: rooms.length - occupied.length,
                roomRevenue,
                restRevenue,
                totalRevenue: roomRevenue + restRevenue
            });
        }

        return json(res, 404, { error: 'Not found.' });

    } catch (err) {
        console.error('API Error:', err);
        return json(res, 500, { error: 'Internal server error.' });
    }
};
