interface LoadingSpinnerProps {
    loading: boolean;
}

const Spinner: React.FC<LoadingSpinnerProps> = ({ loading }) => {
    return <div className={`loading-spinner ${loading ? 'visible' : 'hidden'}`} />;
};

export default Spinner;
