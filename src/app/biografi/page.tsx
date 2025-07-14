import Image from "next/image";

export const metadata = {
  title: "Biografi – Bitte Brun",
  description:
    "Läs om Bitte Bruns resa som konstnär. Ett liv präglat av färg, känslor, natur och berättelser vävda in i målningarnas struktur.",
};

export default function BiografiPage() {
  const paragraphs = [
    "Bitte har alltid dragits till olika konstformer. Att teckna, ett behov av inre stillhet och att skapa med form och färg har följt med som ett inslag från ungdomsåren in i vuxen ålder.",
    "I början av 90-talet tog Bitte en paus från konsten. En egen stor familj tar form i en ständig, dynamisk rörelse av liv, känslor, energier, förändring, utveckling, sorger och mycket kärlek.",
    "Med livet följde även insikter – storheten i var och ens unika obetydlighet. Hur var och en, på samma gång i sin motsats, är unik och värdefull. Betydelsen av vår egen historia, och vad vi bär med oss av dem som lämnar oss när tiden runnit ut. Det vackra och sorgliga i döden – men att motsatsen alltid finns där, så som i naturen.",
    "Bitte inspireras av tanken på hur unika och olika vi är. Nytt liv föds och cirklar sluts i ett ständigt flöde. Vi är länkade till varandra, till naturen och luften vi andas. Vi är en del av framtiden och av dem som lämnat oss – där deras tak blivit vårt golv. Vi är alla en liten unik pusselbit som tillsammans bildar helheten.",
    "Det här blev Bittes nyckel tillbaka in i måleriet. Att lyssna in och återge färgnyanser av känslor, reflektioner, samtal och berättelser får nu vävas in i strukturen av de tjocka och tunna lager färg som läggs på dukarna. Processen blir ett ständigt flöde av lek, lärande och nya upptäckter av olika tekniker. Skapandet blir till en resa utan slutdestination."
  ];


  return (
    <main className="min-h-screen w-full justify-items-center mx-auto py-10 px-5 text-gray-800 leading-relaxed">
      <div className="flex self-center w-full max-w-screen-lg mb-4 justify-center pb-7">
        <h1 className="text-3xl text-gray-600 font-bold italic tracking-wide">Biografi</h1>
      </div>

      <div className="flex flex-col self-center w-full max-w-screen-lg md:flex-row gap-8 items-start">
        {/* Bild */}
        <div className="w-full md:w-2/5 flex-shrink-0">
          <Image
            src="/images/profile_image2.jpg"
            alt="Bitte Brun, konstnär"
            width={500}
            height={500}
            className="w-full h-auto rounded"
          />
          <p className="italic text-center">Bitte Brun - Konstnär</p>
        </div>

        {/* Text */}
        <div className="w-full md:w-3/5 px-5">
          {paragraphs.map((text, i) => (
            <p key={i} className="text-md mb-6">{text}</p>
          ))}
        </div>
      </div>
    </main>
  );
}
