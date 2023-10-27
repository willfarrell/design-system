export const fontFamily =
  "system-ui, 'Segoe UI', Roboto, 'Liberation San', Helvetica, sans-serif"
export const argTypes = {
  aspectRatio: {
    control: 'select',
    options: ['1:1', '2:3', '3:2', '3:4', '4:3', '16:9', '9:16']
  },
  fontFamily: {
    control: 'select',
    options: [
      // Apple, Windows, Android, Linux
      "system-ui, 'Segoe UI', Roboto, 'Liberation San', Helvetica, sans-serif",
      // Modern Font Stacks
      'system-ui, sans-serif',
      "Charter, 'Bitstream Charter', 'Sitka Text', Cambria, serif",
      "'Iowan Old Style', 'Palatino Linotype', 'URW Palladio L', P052, serif",
      "Seravek, 'Gill Sans Nova', Ubuntu, Calibri, 'DejaVu Sans', source-sans-pro, sans-serif",
      "Avenir, Montserrat, Corbel, 'URW Gothic', source-sans-pro, sans-serif",
      "Optima, Candara, 'Noto Sans', source-sans-pro, sans-serif",
      "Inter, Roboto, 'Helvetica Neue', 'Arial Nova', 'Nimbus Sans', Arial, sans-serif",
      "'Nimbus Mono PS', 'Courier New', monospace",
      "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace",
      "Bahnschrift, 'DIN Alternate', 'Franklin Gothic Medium', 'Nimbus Sans Narrow', sans-serif-condensed, sans-serif",
      "ui-rounded, 'Hiragino Maru Gothic ProN', Quicksand, Comfortaa, Manjari, 'Arial Rounded MT', 'Arial Rounded MT Bold', Calibri, source-sans-pro, sans-serif",
      "Rockwell, 'Rockwell Nova', 'Roboto Slab', 'DejaVu Serif', 'Sitka Small', serif",
      "Superclarendon, 'Bookman Old Style', 'URW Bookman', 'URW Bookman L', 'Georgia Pro', Georgia, serif",
      "Didot, 'Bodoni MT', 'Noto Serif Display', 'URW Palladio L', P052, Sylfaen, serif",
      "'Segoe Print', 'Bradley Hand', Chilanka, TSCu_Comic, casual, cursive",
      // Accessible Fonts
      'Atkinson Hyperlegible',
      'Lexend',
      'Poppins'
    ]
  }
}

export const text =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
