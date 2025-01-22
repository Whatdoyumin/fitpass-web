export {};

declare global {
  interface Window {
    kakao: typeof kakao;
  }

  namespace kakao {
    namespace maps {
      function load(callback: () => void): void;

      interface MapOptions {
        center: LatLng;
        level: number;
      }

      class Map {
        constructor(container: HTMLElement, options: MapOptions);
      }

      class LatLng {
        constructor(lat: number, lng: number);
      }

      namespace services {
        class Places {
          keywordSearch(
            keyword: string,
            callback: (
              data: PlacesSearchResultItem[],
              status: string,
              pagination: Pagination
            ) => void
          ): void;
        }

        interface PlacesSearchResultItem {
          place_name: string;
          address_name: string;
          road_address_name?: string;
          phone?: string;
          x: string;
          y: string;
        }

        interface Pagination {
          totalCount: number;
          current: number;
          last: number;
          gotoPage: (page: number) => void;
        }

        const Status: {
          OK: "OK";
          ZERO_RESULT: "ZERO_RESULT";
          ERROR: "ERROR";
        };
      }
    }
  }
}
