

<p align="center">
<img src="https://user-images.githubusercontent.com/30830407/161388741-77be07e3-b082-46a7-9acc-dc9f3ef0faf9.png" />
</p>
<p align="center">
  <strong><i>History through a telescope</i></strong>
</p>

## Try it now

Go to [historicborders.app](https://historicborders.app/) to view a map. Create an account through GitHub, Google or credentials.

## Production Arcitecutre

(Incase you want to self host your own version)

![Untitled-2022-04-02-1104](https://user-images.githubusercontent.com/30830407/161389943-8985ab50-dfed-4122-854f-4f9965080a49.png)

**Please note that since vercel cannot host a database, ensure that your vercel server region is the same as the region your database is hosted in to ensure fasr responses from the database**

## Getting Started

[Blitz.js](https://blitzjs.com/docs/getting-started) is a full stack web development framework build on top of Next.js

Run your app in the development mode.

```
blitz dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Ensure the `.env.local` file has required environment variables:

```
DATABASE_URL=postgresql://<YOUR_DB_USERNAME>@localhost:5432/historicborders-blitz
```

Ensure the `.env.test.local` file has required environment variables:

```
DATABASE_URL=postgresql://<YOUR_DB_USERNAME>@localhost:5432/historicborders-blitz_test
```

## Tests

Runs your tests using Jest.

```
yarn test
```

Blitz comes with a test setup using [Jest](https://jestjs.io/) and [react-testing-library](https://testing-library.com/).

## Commands

Blitz comes with a powerful CLI that is designed to make development easy and fast. You can install it with `npm i -g blitz`

```
  blitz [COMMAND]

  dev       Start a development server
  build     Create a production build
  start     Start a production server
  export    Export your Blitz app as a static application
  prisma    Run prisma commands
  generate  Generate new files for your Blitz project
  console   Run the Blitz console REPL
  install   Install a recipe
  help      Display help for blitz
  test      Run project tests
```

You can read more about it on the [CLI Overview](https://blitzjs.com/docs/cli-overview) documentation.
