// Returns the current date, or a date overridden by ?date=YYYY-MM-DD in the URL.
// Only active in development — in production this always returns the real date.
const getOverride = (): Date | null => {
    if (process.env.NODE_ENV !== 'development') return null;
    const param = new URLSearchParams(window.location.search).get('date');
    if (!param) return null;
    const d = new Date(param + 'T00:00:00Z');
    return isNaN(d.getTime()) ? null : d;
};

const override = getOverride();

const now = (): Date => override ?? new Date();

export default now;
