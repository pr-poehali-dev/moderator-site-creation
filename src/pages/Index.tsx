import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/b1668813-1857-4a26-adc0-91400263c258/files/31b4d3e5-2a1b-4790-bb9c-eee9af70e675.jpg';

const REQUIREMENTS = [
  { icon: 'CalendarClock', title: 'Возраст 16+', text: 'Наличие свободного времени от 4 часов в день' },
  { icon: 'Mic', title: 'Микрофон', text: 'Стабильный интернет и рабочий микрофон для рейдов' },
  { icon: 'MessageSquare', title: 'Грамотная речь', text: 'Вежливость и стрессоустойчивость в общении' },
  { icon: 'Clock8', title: 'Онлайн от 40 ч/нед', text: 'Игровой стаж на проекте не менее 2 недель' },
  { icon: 'ShieldCheck', title: 'Без блокировок', text: 'Чистая история аккаунта за последние 3 месяца' },
  { icon: 'Users', title: 'Работа в команде', text: 'Готовность обучаться и следовать регламенту' },
];

const FAQ = [
  { q: 'Сколько рассматривается заявка?', a: 'Обычно от 1 до 5 рабочих дней. Уведомление придёт на email и по SMS сразу после решения.' },
  { q: 'Модерация оплачивается?', a: 'Да, предусмотрены игровые бонусы и денежное вознаграждение по итогам месяца в зависимости от активности.' },
  { q: 'Можно подать заявку повторно?', a: 'Да, при отказе повторная подача доступна через 14 дней после предыдущего рассмотрения.' },
  { q: 'Какие обязанности у модератора?', a: 'Контроль соблюдения правил, помощь новичкам, разбор жалоб и проведение рейдов на сервере.' },
];

const Index = () => {
  const [status, setStatus] = useState('');
  const [checked, setChecked] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCheck = () => {
    if (!status.trim()) return;
    setChecked(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 glass border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2 font-display font-700 text-xl tracking-wide">
            <span className="text-primary neon-text">BLACK</span>
            <span>RUSSIA</span>
          </div>
          <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground font-medium">
            <button onClick={() => scrollTo('form')} className="hover:text-foreground transition-colors">Анкета</button>
            <button onClick={() => scrollTo('requirements')} className="hover:text-foreground transition-colors">Требования</button>
            <button onClick={() => scrollTo('faq')} className="hover:text-foreground transition-colors">FAQ</button>
            <button onClick={() => scrollTo('status')} className="hover:text-foreground transition-colors">Статус</button>
          </nav>
          <Button onClick={() => scrollTo('form')} className="font-display uppercase tracking-wider">
            Подать заявку
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-16 grid-lines">
        <img src={HERO_IMG} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-primary/30 blur-[120px]" />
        <div className="absolute bottom-0 -left-20 w-96 h-96 rounded-full bg-accent/20 blur-[120px]" />

        <div className="container relative z-10 py-24">
          <div className="max-w-3xl animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 text-primary text-sm mb-6 neon-border">
              <span className="w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
              Идёт набор в команду модерации
            </div>
            <h1 className="font-display font-700 uppercase leading-[0.95] text-5xl sm:text-6xl lg:text-7xl mb-6">
              Стань <span className="text-primary neon-text">модератором</span> <br />
              проекта Black Russia
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mb-9">
              Присоединяйся к команде, которая держит порядок на сервере. Заполни анкету,
              пройди отбор и получи доступ к инструментам модерации, бонусам и уникальному статусу.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => scrollTo('form')} className="font-display uppercase tracking-wider text-base h-13 px-8">
                <Icon name="FileText" size={18} />
                Заполнить анкету
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollTo('requirements')} className="font-display uppercase tracking-wider text-base h-13 px-8 border-primary/40">
                Требования
              </Button>
            </div>
            <div className="flex flex-wrap gap-8 mt-14">
              {[['1200+', 'Заявок обработано'], ['48', 'Активных модераторов'], ['24/7', 'Поддержка сервера']].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display font-700 text-3xl text-primary neon-text">{n}</div>
                  <div className="text-sm text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REQUIREMENTS */}
      <section id="requirements" className="py-24 relative">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-primary font-display uppercase tracking-[0.3em] text-sm">Отбор</span>
            <h2 className="font-display font-700 uppercase text-4xl sm:text-5xl mt-3">Требования к кандидатам</h2>
            <p className="text-muted-foreground mt-4">Проверь себя перед подачей заявки — соответствие критериям ускоряет рассмотрение.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {REQUIREMENTS.map((r) => (
              <div key={r.title} className="group glass border border-border rounded-2xl p-6 hover:border-primary/50 transition-all hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center text-primary mb-4 group-hover:neon-border transition-all">
                  <Icon name={r.icon} size={24} />
                </div>
                <h3 className="font-display font-600 text-xl mb-2">{r.title}</h3>
                <p className="text-muted-foreground text-sm">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="form" className="py-24 relative grid-lines">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/15 blur-[140px]" />
        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-primary font-display uppercase tracking-[0.3em] text-sm">Анкета</span>
              <h2 className="font-display font-700 uppercase text-4xl sm:text-5xl mt-3">Заявка модератора</h2>
              <p className="text-muted-foreground mt-4">Заполни все поля. Ответ придёт на email и по SMS.</p>
            </div>

            <form className="glass border border-border rounded-3xl p-6 sm:p-9 space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label>Игровой ник</Label>
                  <Input placeholder="Ivan_Petrov" />
                </div>
                <div className="space-y-2">
                  <Label>Возраст</Label>
                  <Input type="number" placeholder="18" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="you@mail.ru" />
                </div>
                <div className="space-y-2">
                  <Label>Телефон (для SMS)</Label>
                  <Input type="tel" placeholder="+7 900 000-00-00" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label>Сервер</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Выбери сервер" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Detroit</SelectItem>
                      <SelectItem value="2">Michigan</SelectItem>
                      <SelectItem value="3">Chicago</SelectItem>
                      <SelectItem value="4">Vermont</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Онлайн в день</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Часов в день" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2-4">2–4 часа</SelectItem>
                      <SelectItem value="4-6">4–6 часов</SelectItem>
                      <SelectItem value="6+">6+ часов</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Опыт модерации</Label>
                <Textarea rows={3} placeholder="Расскажи, где и как модерировал ранее" />
              </div>
              <div className="space-y-2">
                <Label>Почему именно ты?</Label>
                <Textarea rows={3} placeholder="Мотивация и сильные стороны" />
              </div>
              <Button type="submit" size="lg" className="w-full font-display uppercase tracking-wider text-base h-13">
                <Icon name="Send" size={18} />
                Отправить анкету
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Нажимая кнопку, ты соглашаешься на обработку данных и получение уведомлений на email и телефон.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* STATUS */}
      <section id="status" className="py-24">
        <div className="container">
          <div className="max-w-xl mx-auto glass border border-border rounded-3xl p-8 sm:p-10 neon-border">
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center text-primary mx-auto mb-4">
                <Icon name="Search" size={26} />
              </div>
              <h2 className="font-display font-700 uppercase text-3xl">Проверка статуса заявки</h2>
              <p className="text-muted-foreground mt-3 text-sm">Введи email или игровой ник, чтобы узнать статус.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Email или ник" className="h-12" />
              <Button onClick={handleCheck} className="h-12 font-display uppercase tracking-wider px-8">Проверить</Button>
            </div>
            {checked && (
              <div className="mt-6 flex items-center gap-4 p-5 rounded-2xl bg-primary/10 border border-primary/30 animate-fade-in">
                <Icon name="Loader" size={22} className="text-primary" />
                <div>
                  <div className="font-display font-600 text-lg">На рассмотрении</div>
                  <div className="text-sm text-muted-foreground">Заявка в очереди. Уведомление придёт на email и по SMS.</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 relative">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-primary font-display uppercase tracking-[0.3em] text-sm">Вопросы</span>
            <h2 className="font-display font-700 uppercase text-4xl sm:text-5xl mt-3">Частые вопросы</h2>
          </div>
          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {FAQ.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="glass border border-border rounded-2xl px-5">
                  <AccordionTrigger className="font-display font-500 text-lg text-left hover:no-underline hover:text-primary">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-display font-700 text-lg">
            <span className="text-primary neon-text">BLACK</span>
            <span>RUSSIA</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 Набор модераторов. Все права защищены.</p>
          <div className="flex gap-3">
            {['Send', 'MessageCircle', 'Youtube'].map((ic) => (
              <a key={ic} href="#" className="w-10 h-10 rounded-xl glass border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all">
                <Icon name={ic} size={18} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
