import { Component } from '@angular/core';

// Solid icons
import { faCoffee, faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

// Brand icons
import { faTwitter, faLinkedin, faYoutube, faInstagram, faGithub, faFacebook } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  faCoffee = faCoffee;
  faTwitter = faTwitter;
  faLinkedin = faLinkedin;
  faYoutube = faYoutube;
  faInstagram = faInstagram;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faMapMarkerAlt = faMapMarkerAlt;
  socialLinks = [
    { label: 'Facebook', href: 'https://facebook.com', icon: faFacebook },
    { label: 'Twitter', href: 'https://twitter.com', icon: faTwitter },
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: faLinkedin },
    { label: 'GitHub', href: 'https://github.com', icon: faGithub }
  ];

  quickLinks = [
    { label: 'Home', routerLink: '/home' },
    { label: 'Courses', routerLink: '/courses' },
    { label: 'About', routerLink: '/about' },
    { label: 'Contact', routerLink: '/contact' }
  ];

  legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' }
  ];
}
