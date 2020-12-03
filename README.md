# Example Gift Register App

## Intro:

The whole application development team at Laing O'Rourke did a 4 day react training course with Stuart from [StayAhead](https://www.stayahead.com/). The course was designed to bring the team up to a common foundation in developing using react as we were moving from an MVC pattern using C#.

Part of this course was creating an example front end application to handle most of the common foundation techniques required.

I couldn't help taking this a bit further then the training required so I'm sharing for others from the team and beyond to take a peak.

## Example Deployment

For ease of review this Github repo is also connected via a pipeline to an example deployment on netlify here:

[Example Deployment on Netlify]()

The intro to the app also explains the key features above the basics from the training.

## Still Todo:

There are lots of extra things I would have liked to have done and may come back and tick some of these off in the future.

- Encountered an issue where it was very hard to get the `AddEditGiftDialog` component to correctly reset upon changing the gift to be edited and had to resort to forcing the component to drop from dom and be recreated by updating its key.
  - It would be good to change this to be clearable by a state change rather then this as it doesn't feel "correct" ...This may just be a quirk of the Formik UseFormik hook as it's hard to get it to reset correctly based on a state change due to scoping available in `useEffect`.
- Make an improved search that is not manually tied into the shape of the Object.
- Make the currency display as it's label instead of the value stored in the DB.
