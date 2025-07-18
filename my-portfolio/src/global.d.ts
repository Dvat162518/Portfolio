// src/global.d.ts
// For Swiper and its styles, add as a new type as your components!
declare module 'swiper/react'; // Declare the React Swiper component
declare module 'swiper/modules';  // This for all internal modules
declare module 'swiper/css';   // For basic Swiper core styles.
declare module 'swiper/css/navigation'; // Declare navigation styles (if used).
declare module 'swiper/css/pagination';  // And pagination too (if it runs!)

// If using TypeScript with older Swiper versions that don't automatically export types,
// or if you encounter type-related errors related to Swiper's options, add these definitions.
//  For more complete and correct Swiper typings for all features that runs.
declare module 'swiper' {
    export const Navigation: unknown; // or 'any' depending on your needs
    export const Pagination: unknown;  // Or 'any' (as same or types),
    export const Autoplay: unknown;     // and add also, (or, import { Autoplay } from 'swiper' and include the component there!)
}
declare module '*.svg' {
    const content: string;
    export default content;
  }
  declare module '*.png' {
    const content: string;
    export default content;
  }
    declare module '*.jpg' {
        const content: string;
        export default content;
    }
    declare module '*.jpeg' {
        const content: string;
        export default content;
    }
    declare module '*.gif' {
        const content: string;
        export default content;
    }
    declare module '*.webp' {
        const content: string;
        export default content;
    }
    declare module '*.ico' {
        const content: string;
        export default content;
    }
    declare module '*.bmp' {
        const content: string;
        export default content;
    }
    declare module '*.tiff' {
        const content: string;
        export default content;
    }
    declare module '*.mp4' {
        const content: string;
        export default content;
    }
    declare module '*.webm' {
        const content: string;
        export default content;
    }
    declare module '*.ogg' {
        const content: string;
        export default content;
    }
    declare module '*.mp3' {
        const content: string;
        export default content;
    }
    declare module '*.wav' {
        const content: string;
        export default content;
    }
    declare module '*.flac' {
        const content: string;
        export default content;
    }
    declare module '*.aac' {
        const content: string;
        export default content;
    }
    declare module '*.wma' {
        const content: string;
        export default content;
    }
    declare module '*.m4a' {
        const content: string;
        export default content;
    }
    declare module '*.json' {
        const content: string;
        export default content;
    }
    declare module '*.pdf' {
        const content: string;
        export default content;
    }
    declare module '*.doc' {
        const content: string;
        export default content;
    }
    declare module '*.docx' {
        const content: string;
        export default content;
    }
    declare module '*.xls' {
        const content: string;
        export default content;
    }
    declare module '*.xlsx' {
        const content: string;
        export default content;
    }
    declare module '*.ppt' {
        const content: string;
        export default content;
    }
    declare module '*.pptx' {
        const content: string;
        export default content;
    }
    declare module '*.zip' {
        const content: string;
        export default content;
    }
    declare module '*.rar' {
        const content: string;
        export default content;
    }
    declare module '*.tar' {
        const content: string;
        export default content;
    }
    declare module '*.gz' {
        const content: string;
        export default content;
    }
    declare module '*.7z' {
        const content: string;
        export default content;
    }
    declare module '*.bz2' {
        const content: string;
        export default content;
    }
      
