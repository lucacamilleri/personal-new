interface DividerProps {
  theme: string;
}

const Divider = ({ theme }: DividerProps) => {
    return (
      <div className='dividerContainer'>
        <hr className={theme === 'dark' ? 'darkDivider' : 'lightDivider'} />
      </div>
    );
}

export default Divider;
