# Advent of Code 2024

> [!WARNING]
> I've been spending more time on infrastructure than actually working
> on the challenges. This is a fluid work in progress

This year I am using JavaScript, but as some deity probably intended: only in
thy browser!

To run:

```shell
$ nix develop
$ simple-http-server --index --nocache
```

Open http://localhost:8000. Add a date object to `#data`, the current day will
open on page load. Place relevant source inputs in the `/days/#` folder and
`fetch`. Each folder must have a `day-#.js` file with the correct day and
expose a `run` default function.
