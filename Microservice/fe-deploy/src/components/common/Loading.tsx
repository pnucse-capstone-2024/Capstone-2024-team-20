export default function Loading() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    }}
    >
      <div style={{
        height: 64,
        width: 64,
        textAlign: 'center',
      }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
          <circle fill="#567ACE" stroke="#567ACE" strokeWidth="16" r="15" cx="40" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4" /></circle>
          <circle fill="#567ACE" stroke="#567ACE" strokeWidth="16" r="15" cx="100" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2" /></circle>
          <circle fill="#567ACE" stroke="#567ACE" strokeWidth="16" r="15" cx="160" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0" /></circle>
        </svg>
      </div>
    </div>
  );
}
