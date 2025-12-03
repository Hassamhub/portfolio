import "./styles/style.css";

const HoverLinks = ({
  text,
  href,
  cursor,
}: {
  text: string;
  href: string;
  cursor?: boolean;
}) => {
  return (
    <a
      href={href}
      data-cursor={!cursor && "disable"}
      className="hover-link"
    >
      <div className="hover-in">
        {text} <div>{text}</div>
      </div>
    </a>
  );
};

export default HoverLinks;
