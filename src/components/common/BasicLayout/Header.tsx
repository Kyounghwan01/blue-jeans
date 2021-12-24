interface IHeader {
  title: string;
  back?: boolean;
  backFunc: () => void;
}
const Header = ({
  title = "없으면그냥아무거나나와",
  back = true,
  backFunc
}: IHeader) => {
  return (
    <div style={{ height: "60px", backgroundColor: "#eee", padding: "20px 0" }}>
      {title}
    </div>
  );
};

export default Header;
