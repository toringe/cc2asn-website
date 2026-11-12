# Vendored scripts

Self-hosted so the site loads nothing from third parties.

| File | Version | Source | License |
|---|---|---|---|
| `gsap.min.js` | GSAP 3.15.0 | npm `gsap@3.15.0`, `dist/` | [GSAP Standard License](https://gsap.com/standard-license) (free, including commercial use) |
| `ScrollTrigger.min.js` | GSAP 3.15.0 | npm `gsap@3.15.0`, `dist/` | same |

The npm tarball was checked against the registry's integrity hash:
`sha512-dMW4CWBTUK1AEEDeZc1g4xpPGIrSf9fJF960qbTZmN/QwZIWY5wgliS6JWl9/25fpTGJrMRtSjGtOmPnfjZB+A==`

Keep the licence header at the top of each file.

## Updating

1. `npm pack gsap@<version> --ignore-scripts` in an empty directory, and compare
   `npm view gsap@<version> dist.integrity` with
   `echo "sha512-$(openssl dgst -sha512 -binary gsap-<version>.tgz | base64)"`.
2. Copy `package/dist/gsap.min.js` and `package/dist/ScrollTrigger.min.js` here.
3. Bump `?v=<version>` on both script tags in `index.html` and update this file.
