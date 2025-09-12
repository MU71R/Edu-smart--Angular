import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/services/messages.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-messages',
  templateUrl: './massage.component.html'
})
export class MessagesComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  conversations: any[] = [];
  selectedChat: any = null;
  newMessage: string = '';
  userId: string = '';
  conversationId: string = '';
  instructorId: string = '';

  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.decodeToken()!.id;

    this.route.queryParams.subscribe(params => {
      this.conversationId = params['conversationId'] || '';
      this.instructorId = params['instructorId'] || '';

      this.loadEnrollments().then(enrollments => {
        if (enrollments.length > 0 && !this.instructorId) {
          this.instructorId = enrollments[0].courseId.instructorID._id;
        }

        if (!this.conversationId && this.instructorId && !this.selectedChat) {
          this.selectedChat = {
            participants: [this.userId, this.instructorId],
            messages: []
          };
        }
      });

      this.loadConversations();

      if (this.conversationId) {
        this.selectChatById(this.conversationId);
      }
    });
  }

  async loadEnrollments(): Promise<any[]> {
    const token = localStorage.getItem('token');
    return await fetch(`http://localhost:3000/enrollments?userId=${this.userId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .catch(() => []);
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop =
        this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  loadConversations() {
    this.messageService.getUserConversations().subscribe({
      next: (res: any) => {
      console.log("Conversations for instructor:", res);
      this.conversations = res;

      // اختيار تلقائي لأول محادثة لو الانستركتور
      if (this.conversations.length > 0 && !this.selectedChat) {
        this.selectChat(this.conversations[0]);
      }
    },
    error: err => console.error("Error loading conversations:", err)
  });
  }

  selectChat(chat: any) {
    this.selectedChat = chat;
    this.loadMessages(chat._id);
  }

  selectChatById(id: string) {
    this.messageService.getConversationById(id).subscribe({
      next: (res: any) => {
        this.selectedChat = res;
      },
      error: err => console.error("Error selecting chat by ID:", err)
    });
  }

  loadMessages(conversationId: string) {
    this.messageService.getMessages(conversationId).subscribe({
      next: (res: any) => {
        if (!this.selectedChat.messages) this.selectedChat.messages = [];
        this.selectedChat.messages = res || [];
      },
      error: err => console.error("Error loading messages:", err)
    });
  }

 // massage.component.ts

sendMessage(messageText: string, receiverId: string) {
  if (!messageText.trim()) {
    console.warn("Cannot send empty message");
    return;
  }

  // احصل على userId من التوكن المفكوك
  const senderId = this.authService.decodeToken()!.id;

  // تأكد من أن كلا الـ IDs موجود
  if (!senderId || !receiverId) {
    console.error("Invalid user IDs:", { senderId, receiverId });
    return;
  }

  // بناء participants array صحيح
  const participants = [senderId, receiverId];

  console.log("Creating conversation with participants:", participants);

  // إرسال الطلب لإنشاء محادثة جديدة
  // بعد إنشاء المحادثة
this.messageService.createConversation(senderId, receiverId).subscribe({
  next: (conversation: any) => {
    if (!conversation || !conversation._id) {
      console.error("Conversation not returned or missing _id", conversation);
      return;
    }
    console.log("Conversation created:", conversation);

    // إرسال الرسالة
    this.messageService.sendMessage(conversation._id as string, senderId, receiverId, messageText).subscribe({
      next: (msg) => console.log("Message sent:", msg),
      error: (err) => console.error("Error sending message:", err)
    });
  },
  error: (err) => {
    console.error("Error creating conversation:", err);
  }
});
}

   
}
