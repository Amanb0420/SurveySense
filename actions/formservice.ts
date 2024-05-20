// "use server"

class FormService {
    private static instance: FormService;
    private description: string = "";
  
    private constructor() {}
  
    public static getInstance(): FormService {
      if (!FormService.instance) {
        FormService.instance = new FormService();
      }
      return FormService.instance;
    }
  
    async getDescription() {
        console.log(this.description);
      return this.description;
    }
  
    setDescription(description: string): void {
      this.description = description;
      console.log(this.description);
    }
  }
  
  export default FormService;
  