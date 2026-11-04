- Brand mascot SVGs live in src/assets as bundled files (small vectors, served locally and on hosting).

- Online payments use Bold embedded checkout; the integrity signature is computed in the `bold-signature` edge function from the DB order total, never on the client.
