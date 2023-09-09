# Kamel GT

This site is the official website of the Kamel GT community at the [VCR Discord server](https://discord.gg/6arPQbNMbt). We race the "low-participation" iRacing series by the same name and the purpose of this site is to reduce friction for newcomers to the series. This site hosts the community organized race times, car setups, tips, tricks, and past broadcasts.

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

The main two data sources of the project are the `season-setups.js` and `broadcasts.js` files. They both depend on the `track-names.js` files and these track names are spread into the broadcasts for titling, and the `alternateTitle` property is used for easier searching; a user can search for either "Nürburgring" or "Nurburgring" and they will both yield results, for example.


#### Season Setups

The `season-setups.js` file is a simple data structure of the races for the current season only, as some basic round info and two arrays of setups for the cars. Optionally&mdash;these may include an array of notes (long race, you'll need to pit, etc.)


#### Broadcasts

We host a searchable list of broadcasts going back several years where each `Broadcast` item is linked to YouTube and automatically sources the thumbnail for that video. This is a feature that no one asked for, but has proven to be useful for asking questions like "how often do we race at Suzuka" or "when last have we done an alternate layout at Mid-Ohio?" This file may ultimately become a good source of other historic data if we keep adding broadcasts and detail to it.