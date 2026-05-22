interface PixelateSvgFilterProps {
  id: string;
  size?: number;
  crossLayers?: boolean;
}

export default function PixelateSvgFilter({
  id = "pixelate-filter",
  size = 16,
  crossLayers = false,
}: PixelateSvgFilterProps) {
  return (
    <svg className="absolute inset-0">
      <defs>
        <filter height="1" id={id} width="1" x="0" y="0">
          {"First layer: Normal pixelation effect"}
          <feConvolveMatrix
            kernelMatrix="1 1 1
                          1 1 1
                          1 1 1"
            result="AVG"
          />
          <feFlood height="1" width="1" x="1" y="1" />
          <feComposite
            height={size}
            k1="0"
            k2="1"
            k3="0"
            k4="0"
            operator="arithmetic"
            width={size}
          />
          <feTile result="TILE" />
          <feComposite
            in="AVG"
            in2="TILE"
            k1="0"
            k2="1"
            k3="0"
            k4="0"
            operator="in"
          />
          <feMorphology operator="dilate" radius={size / 2} result={"NORMAL"} />
          {crossLayers && (
            <>
              {"Second layer: Fallback with full-width tiling"}
              <feConvolveMatrix
                kernelMatrix="1 1 1
                              1 1 1
                              1 1 1"
                result="AVG"
              />
              <feFlood height="1" width="1" x="1" y="1" />
              <feComposite
                height={size}
                in2="SourceGraphic"
                k1="0"
                k2="1"
                k3="0"
                k4="0"
                operator="arithmetic"
                width={size / 2}
              />
              <feTile result="TILE" />
              <feComposite
                in="AVG"
                in2="TILE"
                k1="0"
                k2="1"
                k3="0"
                k4="0"
                operator="in"
              />
              <feMorphology
                operator="dilate"
                radius={size / 2}
                result={"FALLBACKX"}
              />
              {"Third layer: Fallback with full-height tiling"}
              <feConvolveMatrix
                kernelMatrix="1 1 1
                              1 1 1
                              1 1 1"
                result="AVG"
              />
              <feFlood height="1" width="1" x="1" y="1" />
              <feComposite
                height={size / 2}
                in2="SourceGraphic"
                k1="0"
                k2="1"
                k3="0"
                k4="0"
                operator="arithmetic"
                width={size}
              />
              <feTile result="TILE" />
              <feComposite
                in="AVG"
                in2="TILE"
                k1="0"
                k2="1"
                k3="0"
                k4="0"
                operator="in"
              />
              <feMorphology
                operator="dilate"
                radius={size / 2}
                result={"FALLBACKY"}
              />
              <feMerge>
                <feMergeNode in="FALLBACKX" />
                <feMergeNode in="FALLBACKY" />
                <feMergeNode in="NORMAL" />
              </feMerge>
            </>
          )}
          {!crossLayers && <feMergeNode in="NORMAL" />}
        </filter>
      </defs>
    </svg>
  );
}
