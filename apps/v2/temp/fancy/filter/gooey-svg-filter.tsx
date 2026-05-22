const GooeySvgFilter = ({
  id = "gooey-filter",
  strength = 10,
}: {
  id?: string;
  strength?: number;
}) => {
  return (
    <svg className="absolute hidden">
      <defs>
        <filter id={id}>
          <feGaussianBlur
            in="SourceGraphic"
            result="blur-sm"
            stdDeviation={strength}
          />
          <feColorMatrix
            in="blur-sm"
            result="goo"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
};

export default GooeySvgFilter;
