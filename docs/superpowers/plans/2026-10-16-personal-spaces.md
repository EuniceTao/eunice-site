# Personal Spaces Implementation Plan

**Goal:** Implement the user-approved photo directory, portrait-frame entrance, Hello World photo space, separate work studio and personal experiments entrance.
**Architecture:** Keep the living-room Canvas mounted behind a native modal dialog so its camera survives entry/return. HomePage owns content-space selection. RoomScene owns the short approach transition and restores its previous camera before returning. Dialog presentation and photo directory styles belong to design-system/room; personal content belongs to pages/home/spaces. Existing detail routes and CMS keys remain unchanged.
**Tech Stack:** React 19, React Router 7, Three/R3F, native dialog, existing CSS tokens. No dependencies.
**Spec:** User-approved conversation on 2026-10-16: portrait on sofa side table opens photos/self-introduction/Hesse quote; photo directory; separate work room; 吵吵艺术馆 link.

## Scope and files
- Modify HomePage.jsx, sections/HomeIndexView.jsx, room/roomItems.js: route the same three space entrances from Canvas, directory and mobile, retain other links/panels.
- Modify RoomScene.jsx, RoomCamera.jsx, scene/roomNavigation.js, RoomWorld.jsx and RoomContentObjects.jsx: optional space callback, approach/restore, move about to actual frame and add experiments exhibit.
- Add scene/furniture/PersonalObjects.jsx: local portrait texture with failure fallback and disposal; table and frame.
- Add spaces/PersonalSpace.jsx, WorkSpace.jsx, ExperimentSpace.jsx, SpaceContent.jsx, usePersonalPhotos.js: reuse home.hero/home.quote and existing work data. Work studio gets a separate Three scene in spaces/StudioScene.jsx.
- Add design-system/room/spaces/{SpaceDialog.jsx,spaces.css,directory.css}: accessible focus-trapping modal, return control, responsive photo-led styles and gallery.
- Update AGENTS.md only for changed photo/space responsibilities.

## Implementation and validation
- [x] Save source baseline and use hashes/diff (working copy is not a Git repo).
- [x] Add photo directory, stable category names and assigned existing photos; test rendered links/buttons and all local image URLs.
- [x] Add dialog and content: showModal, initial focus, Escape/native cancel, body scroll restoration and focus return. Exercise close from scrolled state and repeated open/close.
- [x] Add personal photos with manual previous/next and scroll gallery, resolve existing storage refs without changing content contracts; filter failed images without a loop.
- [x] Add actual frame and independent work-studio scene using existing furniture/materials, expose accessible HTML links outside canvas.
- [x] Add experiments content with exact supplied external URL and noopener/noreferrer. Do not fabricate a game screenshot or description of unverified play.
- [x] Build with --configLoader native, lint changed files, run existing camera/interaction tests and targeted new regression checks.
- [x] Browser check desktop, directory, portrait entry, work space, experiments link, Escape/return, mobile and reduced motion; review full diff against baseline.

## Compatibility and risks
- Original /about, /work, /work/:id and /projects keep their routes and data.
- No publishing or changes to the formal site. Shared node_modules is read-only input.
- Personal photographs in the frame are the explicitly authorized exception to the old no-photo-texture rule.
- Limit simultaneous rendering using demand frames; dispose studio resources on close. Reduced motion skips approach animation.
- Existing unrelated lint errors remain outside scope; report separately if encountered.

Browser verification reproduced an existing removeChild exception when leaving the Canvas. Html used the same parent as React-managed Canvas children. Routed Html labels into a dedicated empty DOM layer in RoomScene, wired through RoomWorld/RoomContentObjects. Repeating room/directory navigation then produced no new exception.
