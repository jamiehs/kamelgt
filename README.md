# IMSA Vintage Series/Kamel GT

This site is the official website of the iRacing _IMSA Vintage Series_/_Kamel GT Championship_ community at the [VCR Discord server](https://discord.gg/6arPQbNMbt). We race the "low-participation" iRacing series by the same name and the purpose of this site is to reduce friction for newcomers to the series. This site hosts the community organized race times, car setups, tips, tricks, and past broadcasts.

## Development Info

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Having said that, since CRA is essentially dying, we will need to either eject or transition to another build process at some point in the near future.

The project currently uses SCSS, TypeScript, and React

Assuming you have [Node.js](https://nodejs.org/en) `16.x.x` or greater installed, after cloning the project directory, you can run:

`npm install` to install the dependencies

`npm start` to run the dev server


## Project Structure

### Timeslots
Timeslots use the `Timeslot` component and render a localized, time-zone accurate "timeslot" card that lets visitors know when the community organized race will be happening in their local time.

In `App.tsx` the timeslots are defined as follows:

```jsx
<Timeslot
    label="Label"
    dayIndex={3}
    time="19:00"
    entries={56}
    gtoSof={2975}
    gtpSof={3197}
>
    <p>
        Description
    </p>
</Timeslot>
```

### Data Sources

The main two data sources of the project are the `season-setups.js` and `broadcasts.js` files. They both depend on the `track-data.js` files and these track names are spread into the broadcasts for titling, and the `alternateTitle` property is used for easier searching; a user can search for either "Nürburgring" or "Nurburgring" and they will both yield results, for example.


#### Season Setups

The `season-setups.js` file is a simple data structure of the races for the current season only, as some basic round info and two arrays of setups for the cars. Optionally&mdash;these may include an array of notes (long race, you'll need to pit, etc.)


#### Fetching Setups from Discord

Run this on Tuesday (or whenever you want to pick up what the community posted):

```bash
npm run fetch-setups
```

This downloads all `.sto` attachments from `#audi-setups` and `#nissan-setups` posted in the last 7 days, fuzzy-matches each filename to the correct track folder, then automatically runs `sync-setups` to wire everything into `track-data.js`.

**Override the lookback window:**
```bash
npm run fetch-setups -- --days=14
```

**Backfill setups for a specific track:**
```bash
npm run fetch-setups barber
```
Searches up to 2 years of history in both channels and downloads only barber-matched files.

**Track name resolution** works without exact spelling — "panorama" resolves to Bathurst, "americas" to COTA, "rodriguez" to Mexico. If a file can't be resolved automatically, the script asks interactively. Press enter to skip.

**Requires:** a `.env` file at the project root. Copy `.env.example` and fill in your Discord bot token and channel IDs (see `.env.example` for setup instructions).

#### Adding Setups

Car setups are shared by racers on the VCR Discord each week. After downloading them, drop the `.sto` files into the correct folder:

```
public/setups/<car>/<track>/
```

Where `<car>` is `audi90gto` or `nissangtpzxt`, and `<track>` is the kebab-case track folder name (e.g. `summit-point`, `laguna-seca`).

Then run:

```bash
npm run sync-setups
```

This detects new untracked files via git, parses filenames for qualifying/race type and sibling pairing, shows a preview, and surgically inserts the entries into `track-data.js`. Qualifying setups always appear above their race sibling. You confirm per track before anything is written.

**Pruning:** when a car/track combo would exceed 4 setups, the script flags older ones for removal and offers three options: skip, accept suggestions, or review interactively. "Alien" setups (JDelOlmo, Andrius temperature-specific setups) are worth keeping regardless of age — use interactive mode and say no to those.

**Seeding an existing track with no setups yet:** If a track already exists in `track-data.js` as a stub (title only, no setups block) and you have old setups on disk for it, use:

```bash
npm run sync-setups <track>
```

For example, `npm run sync-setups cota` will scan all `.sto` files in `public/setups/*/cota/`, skip any already registered, and add the rest. This is also useful for backporting setups from a prior season.

**After running the script:** review with `git diff src/data/track-data.js`, then commit the setup files and the track-data change together.

#### Broadcasts

We host a searchable list of broadcasts going back several years where each `Broadcast` item is linked to YouTube and automatically sources the thumbnail for that video. This is a feature that no one asked for, but has proven to be useful for asking questions like "how often do we race at Suzuka" or "when last have we done an alternate layout at Mid-Ohio?" This file may ultimately become a good source of other historic data if we keep adding broadcasts and detail to it.